<template>
    <div
      ref="popoverRef"
      class="diff-popover"
      :style="popoverStyle"
      @click="handleSelfClick"
      :data-popover-id="popoverId"
    >
      <div ref="arrowRef" class="popover-arrow" :style="arrowStyle"></div>
  
      <div class="popover-content">
        <span class="label sr-only">Old Value ({{ fieldName || popoverId }}):</span>
  
        <div class="value-display">
          <template v-if="elementType === 'input'">
            <div v-if="inputType === 'checkbox'" class="readonly-input-wrapper checkbox-wrapper">
              <input
                type="checkbox"
                :checked="isChecked"
                disabled
                class="readonly-input readonly-checkbox"
                aria-hidden="true"
              />
              <span class="readonly-text-label">{{ isChecked ? 'Checked' : 'Unchecked' }}</span>
            </div>
            <div v-else-if="inputType === 'radio'" class="readonly-input-wrapper radio-wrapper">
               <input
                  type="radio"
                  :value="props.oldValue"
                  :checked="isRadioChecked"
                  disabled
                  class="readonly-input readonly-radio"
                  aria-hidden="true"
                />
                <span class="readonly-text-label">{{ String(props.targetElement?.value ?? props.oldValue ?? '(empty)') }}</span>
            </div>
            <input
              v-else
              :type="inputType === 'password' ? 'text' : inputType"
              :value="String(props.oldValue ?? '')"
              disabled
              class="readonly-input"
              readonly
            />
          </template>
  
          <textarea
            v-else-if="elementType === 'textarea'"
            :value="String(props.oldValue ?? '')"
            disabled
            class="readonly-input readonly-textarea"
            readonly
          ></textarea>
  
          <span v-else-if="elementType === 'select'" class="readonly-input readonly-text">
            {{ selectedOptionText }}
          </span>
  
          <span v-else class="readonly-input readonly-text">
            {{ String(props.oldValue ?? '(empty)') }}
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
  // Import necessary functions from @floating-ui/vue
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/vue';
  
  // --- Props Definition ---
  const props = defineProps({
    targetElement: {
      type: Object, // Should be an HTMLElement
      required: true,
    },
    oldValue: {
      type: [String, Number, Boolean, null, undefined],
      default: '',
    },
    popoverId: { // Unique ID for this popover instance
      type: String,
      required: true,
    },
    fieldName: { // Display name (optional, defaults to ID)
      type: String,
      default: '',
    }
  });
  
  // --- Emit Definition ---
  const emit = defineEmits(['close']);
  
  // --- DOM Refs ---
  const popoverRef = ref(null);
  const arrowRef = ref(null);
  
  // --- Reactive Styles for Popover and Arrow ---
  const popoverStyle = reactive({
    position: 'absolute', left: '0px', top: '0px', zIndex: 1050,
    visibility: 'hidden', opacity: 0, transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
    width: null, // Will be set dynamically
    height: null, // Will be set dynamically
    boxSizing: 'border-box', // Critical for size matching
    overflow: 'auto',      // Allow internal scrolling if needed
  });
  const arrowStyle = reactive({});
  
  // --- Floating UI Cleanup Function ---
  let cleanupAutoUpdate = null;
  
  // --- Computed Properties for Element Analysis ---
  const elementType = computed(() => props.targetElement?.tagName?.toLowerCase());
  const inputType = computed(() => props.targetElement?.type?.toLowerCase());
  // Note: Using targetElement.rows might not reflect CSS height, offsetHeight is used for sizing
  // const inputRows = computed(() => props.targetElement?.rows);
  
  const isChecked = computed(() => { // Handles boolean or string 'true'
      if (typeof props.oldValue === 'string') return props.oldValue.toLowerCase() === 'true';
      return Boolean(props.oldValue);
  });
  // Checks if the specific radio instance's value matches the old value state
  const isRadioChecked = computed(() => props.targetElement?.value == props.oldValue);
  
  // Gets display text for selected option in a <select>
  const selectedOptionText = computed(() => {
      if (elementType.value === 'select') {
          const options = props.targetElement?.options;
          if (options) {
              for (let i = 0; i < options.length; i++) {
                  if (options[i].value == props.oldValue) return options[i].text;
              }
          }
          return `(Value: ${props.oldValue ?? 'empty'})`; // Fallback
      }
      return String(props.oldValue ?? '(empty)');
  });
  
  
  // --- Combined Position AND Size Update Function ---
  const updatePositionAndSize = async () => {
    // Ensure elements are available
    if (!props.targetElement || !popoverRef.value) return;
  
    // 1. Get Target Dimensions using offsetWidth/offsetHeight
    const targetWidth = props.targetElement.offsetWidth;
    const targetHeight = props.targetElement.offsetHeight;
  
    // Validate dimensions
    const hasValidDimensions = !isNaN(targetWidth) && !isNaN(targetHeight) && targetWidth > 0 && targetHeight > 0;
  
    try {
      // 2. Calculate Position using Floating UI
      const { x, y, placement, middlewareData } = await computePosition(
        props.targetElement, popoverRef.value, {
          placement: 'bottom', // Preferred placement
          strategy: 'absolute', // Use absolute positioning
          middleware: [
            offset(8),             // Gap between target and popover
            flip(),                // Flip placement if space is insufficient
            shift({ padding: 5 }), // Prevent overflow from viewport edges
            arrow({ element: arrowRef }), // Calculate arrow position
          ],
        }
      );
  
      // 3. Apply Calculated Position AND Size
      Object.assign(popoverStyle, {
        left: `${x}px`,
        top: `${y}px`,
        // Apply dimensions only if they are valid, otherwise use 'auto'
        width: hasValidDimensions ? `${targetWidth}px` : 'auto',
        height: hasValidDimensions ? `${targetHeight}px` : 'auto',
        visibility: 'visible', // Make visible after calculation
        opacity: 1,
      });
  
      // 4. Calculate and Apply Arrow Position (only if dimensions are valid)
      const { x: arrowX, y: arrowY } = middlewareData.arrow || {};
      const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[placement.split('-')[0]];
  
      if (arrowRef.value && staticSide && hasValidDimensions) {
        Object.assign(arrowStyle, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          [staticSide]: '-4px', // Position arrow slightly outside the popover edge
        });
         arrowRef.value.style.visibility = 'visible'; // Show arrow
      } else if (arrowRef.value) {
         arrowRef.value.style.visibility = 'hidden'; // Hide arrow if size is invalid
      }
  
    } catch (error) {
      console.error(`Floating UI position/size error for popover ${props.popoverId}:`, error);
      // Hide popover on error
      Object.assign(popoverStyle, { visibility: 'hidden', opacity: 0 });
    }
  };
  
  // --- Lifecycle Hooks ---
  onMounted(() => {
    // Use nextTick to ensure elements are ready in the DOM
    nextTick(() => {
      if (props.targetElement && popoverRef.value) {
        // Setup autoUpdate to keep position and size synchronized
        cleanupAutoUpdate = autoUpdate(
          props.targetElement,
          popoverRef.value,
          updatePositionAndSize, // Function to run on updates
          {
              ancestorScroll: true, // Detect scroll in parents
              elementResize: true,  // Detect resize of target/popover
              // animationFrame: true // Use rAF for smoother updates (optional)
          }
        );
      } else {
        // Warn if elements aren't ready, helps debugging
        console.warn(`Popover ${props.popoverId}: Target or popover ref not ready on mount.`);
      }
    });
  });
  
  onBeforeUnmount(() => {
    // CRITICAL: Clean up the autoUpdate listener to prevent memory leaks
    if (cleanupAutoUpdate) {
      cleanupAutoUpdate();
    }
  });
  
  // --- Close Handler ---
  const handleSelfClick = () => {
    // Emit the 'close' event with this popover's unique ID
    emit('close', props.popoverId);
  };
  </script>
  
  <style scoped>
  /* Base styles for the popover container */
  .diff-popover {
    background-color: #2c2c2c; /* Darker background */
    color: #e0e0e0;         /* Light grey text */
    border-radius: 4px;      /* Slightly softer edges */
    font-size: inherit;      /* Inherit font size from target context */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    cursor: pointer;         /* Indicate clickable to close */
    line-height: 1.4;
    /* Critical styles for size matching and overflow */
    box-sizing: border-box;
    overflow: auto; /* Allow internal scroll if content overflows fixed size */
    padding: 0; /* Padding applied to inner content */
    border: 1px solid #555; /* Subtle border */
  }
  
  /* Arrow styling */
  .popover-arrow {
    position: absolute;
    background: #2c2c2c; /* Match popover background */
    border-right: 1px solid #555; /* Match border */
    border-bottom: 1px solid #555;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    z-index: 1; /* Ensure arrow is above content bg if needed */
    visibility: hidden; /* Hidden until position is calculated */
  }
  
  /* Inner content container */
  .popover-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 8px 10px; /* Internal padding */
    box-sizing: border-box;
  }
  
  /* Visually hidden label for accessibility */
  .label.sr-only {
      position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
      overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;
  }
  
  /* Container for the disabled form element replica */
  .value-display {
    flex-grow: 1; /* Take available vertical space */
    display: flex; /* Use flex for the element itself */
    align-items: stretch;
    justify-content: stretch;
    min-height: 0; /* Allow shrinking */
    min-width: 0;
    background-color: #3a3a3a; /* Background for the value area */
    border-radius: 3px;
  }
  
  /* Shared styles for the disabled replica elements */
  .readonly-input, .readonly-textarea, .readonly-text {
    /* Reset appearance */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    /* Basic styling */
    padding: 0; /* Padding handled by wrapper or display area */
    margin: 0;
    font-family: inherit;
    font-size: inherit; /* Use inherited font size */
    background-color: transparent; /* Make background transparent */
    border: none; /* Remove internal border */
    color: #e0e0e0; /* Match popover text color */
    box-sizing: border-box;
    cursor: default;
    line-height: inherit;
    /* Sizing to fill container */
    width: 100%;
    height: 100%;
    flex-grow: 1;
    /* Ensure text is visible if background set on wrapper */
    position: relative;
    z-index: 1;
  }
  
  /* Specific overrides for element types */
  .readonly-textarea {
    resize: none;
    overflow: auto; /* Allow scrolling within textarea if needed */
    white-space: pre-wrap; /* Preserve whitespace */
    padding: 6px 8px; /* Add padding directly to textarea */
  }
  .readonly-text {
      white-space: pre-wrap;
      word-wrap: break-word;
      padding: 6px 8px; /* Add padding to span */
      display: block; /* Ensure span behaves like a block */
  }
  /* Inputs need padding */
  input.readonly-input {
      padding: 6px 8px;
  }
  
  /* Checkbox/Radio specific layout */
  .readonly-input-wrapper {
      display: flex;
      align-items: center;
      padding: 6px 8px; /* Padding on the wrapper */
      width: 100%; height: 100%; box-sizing: border-box;
      flex-grow: 1;
      gap: 8px; /* Space between check/radio and label */
      cursor: default;
  }
  .readonly-checkbox, .readonly-radio {
      /* Reset flex sizing */
      width: auto; height: auto; flex-grow: 0; flex-shrink: 0;
      /* Visual styling for disabled state */
      accent-color: #666;
      cursor: default;
      opacity: 0.7;
      /* Adjust size if needed */
      transform: scale(0.9);
  }
  .readonly-text-label {
      display: inline-block; vertical-align: middle; color: #ccc; cursor: default;
      white-space: normal; overflow: hidden; text-overflow: ellipsis;
  }
  
  /* Hide default browser focus rings on disabled elements */
  .readonly-input:focus, .readonly-textarea:focus {
      outline: none;
  }
  </style>