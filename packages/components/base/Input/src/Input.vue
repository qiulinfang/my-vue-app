<template>
  <div :class="bemBlockClass">
    <div v-if="$slots.prepend" class="custom-input__prepend">
      <slot name="prepend" />
    </div>

    <div ref="wrapperRef" class="custom-input__wrapper">
      <div v-if="$slots.prefix" class="custom-input__prefix">
        <slot name="prefix" />
      </div>

      <input
        v-if="props.type !== 'textarea'"
        ref="inputRef"
        class="custom-input__input"
        :type="inputType"
        :value="nativeInputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autocomplete ? 'on' : 'off'"
        @input="handleInput"
        @change="handleChange"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <textarea
        v-else
        :id="inputId"
        ref="textareaRef"
        class="custom-input__textarea"
        :style="textareaStyle"
        :value="nativeInputValue"
        v-bind="attrs"
        :minlength="minlength"
        :maxlength="maxlength"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete ? 'on' : 'off'"
        :placeholder="placeholder"
        :form="form"
        :autofocus="autofocus"
        :rows="rows"
        :role="containerRole"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />

      <div v-if="showSuffixContent" class="custom-input__suffix">
        <slot v-if="$slots.suffix" name="suffix" />
        <button
          v-if="showClear"
          type="button"
          class="custom-input__clear-btn"
          aria-label="Clear input"
          @click="clear"
        >
          <el-icon><circle-close /></el-icon>
        </button>

        <button
          v-if="showPwdVisible"
          type="button"
          class="custom-input__password-btn"
          aria-label="Toggle password visibility"
          @click="handlePasswordVisible"
        >
          <el-icon><component :is="passwordIcon" /></el-icon>
        </button>
      </div>
    </div>

    <div v-if="showAppendContent" class="custom-input__append">
      <slot v-if="$slots.append" name="append" />
      <span v-if="isWordLimitVisible" class="custom-input__limit">
        {{ textLength }} / {{ maxlength }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, useAttrs } from "vue";
import { CircleClose, Hide as IconHide, View as IconView } from "@element-plus/icons-vue";
import { ElIcon } from "element-plus"; // Assuming you use element-plus icons elsewhere

// Define Props (Keep your existing props definition)
const props = defineProps({
  modelValue: { type: [String, Number], default: "" }, // Changed default
  type: { type: String, default: "text" }, // Changed default
  placeholder: { type: String },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  minlength: { type: [String, Number] },
  maxlength: { type: [String, Number] },
  autocomplete: { type: Boolean, default: false }, // Default to off usually
  showWordLimit: { type: Boolean, default: false },
  showPassword: { type: Boolean, default: false },
  formatter: Function,
  parser: Function,
  // Props for textarea specifically (add if needed, or rely on attrs)
  rows: { type: [String, Number], default: 2 },
  form: { type: String },
  autofocus: { type: Boolean, default: false },
  inputId: { type: String }, // For label association if needed
  containerRole: { type: String },
});

// Define Emits
const emit = defineEmits([
  "update:modelValue",
  "input",
  "change",
  "keydown",
  "focus",
  "blur",
  "clear",
]);

// Refs
const inputRef = ref(null);
const textareaRef = ref(null);
const wrapperRef = ref(null); // Ref for the main wrapper div
const _ref = computed(() => inputRef.value || textareaRef.value);

// State
const attrs = useAttrs(); // To bind extra attributes to textarea if needed
const passwordVisible = ref(false);
const isFocused = ref(false); // Track focus state

// Computed Properties
const nativeInputValue = computed(() => String(props.modelValue ?? ""));

const inputType = computed(() => {
  if (props.type === "password" && props.showPassword) {
    return passwordVisible.value ? "text" : "password";
  }
  return props.type;
});

const isWordLimitVisible = computed(
  () =>
    props.showWordLimit &&
    props.maxlength &&
    (props.type === "text" || props.type === "textarea") &&
    !props.disabled &&
    !props.readonly
);

const passwordIcon = computed(() => (passwordVisible.value ? IconView : IconHide));

const showPwdVisible = computed(
  () =>
    props.type === "password" &&
    props.showPassword &&
    !props.disabled &&
    !props.readonly &&
    nativeInputValue.value.length > 0 // Only show toggle if there's content
);

const showClear = computed(
  () =>
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    nativeInputValue.value.length > 0 &&
    isFocused.value // Show clear typically only on focus
);

// Computed flags for conditional rendering in template
const showSuffixContent = computed(
  () => !!useSlots().suffix || showClear.value || showPwdVisible.value
);
const showAppendContent = computed(() => !!useSlots().append || isWordLimitVisible.value);

const textLength = computed(() => nativeInputValue.value.length);

// BEM Classes Computation
const bemBlockClass = computed(() => [
  "custom-input",
  {
    "custom-input--textarea": props.type === "textarea",
    "custom-input--disabled": props.disabled,
    "custom-input--readonly": props.readonly, // You might need specific readonly styles
    "custom-input--focused": isFocused.value, // Add focus class to root if needed
    // Add other modifiers based on props if necessary (e.g., size)
  },
]);

// Watchers
watch(nativeInputValue, (val) => {
  setNativeInputValue(val);
});

// Methods
const setNativeInputValue = (val = nativeInputValue.value) => {
  const inputEl = _ref.value;
  if (!inputEl) return;

  const formattedValue = props.formatter ? props.formatter(val) : val;
  if (inputEl.value !== formattedValue) {
    inputEl.value = formattedValue;
  }
};

const handleInput = (event) => {
  let value = event.target.value;
  if (props.parser) {
    value = props.parser(value);
  }
  // Check maxlength for non-textarea types where browser doesn't enforce strictly on input event
  if (props.type !== "textarea" && props.maxlength && value.length > Number(props.maxlength)) {
    value = value.slice(0, Number(props.maxlength));
    // Update the input value visually if cut
    event.target.value = value;
  }

  emit("update:modelValue", value);
  emit("input", value); // Emit raw input value if needed
};

const handleChange = (event) => {
  emit("change", event.target.value);
};

const handleKeydown = (evt) => {
  emit("keydown", evt);
};

const handleFocus = (event) => {
  isFocused.value = true;
  emit("focus", event);
};

const handleBlur = (event) => {
  isFocused.value = false;
  emit("blur", event);
  // Optional: You might want to trigger change on blur if modelValue hasn't updated yet
  // if (_ref.value?.value !== nativeInputValue.value) {
  //   handleChange(event);
  // }
};

const clear = () => {
  emit("update:modelValue", "");
  emit("input", "");
  emit("change", "");
  emit("clear");
  _ref.value?.focus(); // Keep focus after clearing
};

const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
  // Keep focus on the input after toggling
  _ref.value?.focus();
};

// Lifecycle Hooks
onMounted(() => {
  if (!props.formatter && props.parser) {
    console.error(
      "CustomInput:",
      "If you set the 'parser', you should also consider setting the 'formatter'."
    );
  }
  setNativeInputValue(); // Initialize input value
});

// Expose focus/blur methods if needed by parent components
defineExpose({
  focus: () => _ref.value?.focus(),
  blur: () => _ref.value?.blur(),
  input: inputRef, // expose input ref
  textarea: textareaRef, // expose textarea ref
});

// Need to import useSlots if you check for slots presence in script setup
import { useSlots } from "vue";
const textareaStyle = computed(() => ({
  "--textarea-rows": props.rows, // 将 props.rows 的值赋给 CSS 变量
}));
</script>

<style lang="scss" scoped>
// SCSS Variables (Customize as needed)
$input-padding-vertical: 8px;
$input-padding-horizontal: 12px;
$input-border-color: #dcdfe6;
$input-border-radius: 4px;
$input-font-size: 14px;
$input-focus-border-color: #6082d8; // Example focus color
$input-disabled-bg: #f5f7fa;
$input-disabled-border: #e4e7ed;
$input-disabled-color: #c0c4cc;
$input-icon-color: #a8abb2;
$input-placeholder-color: #a8abb2; // Or #c0c4cc for lighter

// BEM Structure
.custom-input {
  display: inline-flex; // Use inline-flex to behave like a standard input group
  align-items: stretch; // Stretch items vertically by default
  width: 100%; // Default to block-level width, adjust if needed
  font-size: $input-font-size;
  line-height: 1.5; // Adjust as needed
  position: relative; // For potential absolute positioning inside

  // --- Modifiers ---
  &--textarea {
    // Specific styles for textarea mode if needed (e.g., vertical alignment)
    align-items: stretch; // Wrapper should stretch with textarea
    .custom-input__wrapper {
      padding: $input-padding-vertical $input-padding-horizontal; // Padding on wrapper for textarea
    }
    .custom-input__textarea {
      padding: 0; // Remove padding from textarea itself if wrapper has it
    }
  }

  &--disabled {
    cursor: not-allowed;
    .custom-input__wrapper {
      background-color: $input-disabled-bg;
      border-color: $input-disabled-border;
    }
    .custom-input__input,
    .custom-input__textarea,
    .custom-input__prefix :slotted(*), // Style slotted content when disabled
    .custom-input__suffix :slotted(*) {
      color: $input-disabled-color;
      cursor: not-allowed;
      -webkit-text-fill-color: $input-disabled-color; // For webkit browsers
    }
    .custom-input__clear-btn,
    .custom-input__password-btn {
      cursor: not-allowed;
      color: $input-disabled-color;
    }
  }

  // --- Elements ---
  &__wrapper {
    display: inline-flex;
    align-items: center;
    flex-grow: 1; // Allow wrapper to take available space
    padding: 0; // Padding applied to input/textarea or wrapper depending on type
    background-color: #fff;
    border: 1px solid $input-border-color;
    border-radius: $input-border-radius;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    box-sizing: border-box; // Include padding/border in width/height

    // Apply padding to wrapper only if NOT a textarea (textarea applies padding differently)
    &:not(:has(.custom-input__textarea)) {
      padding: $input-padding-vertical $input-padding-horizontal;
    }

    &:hover:not(.custom-input--disabled *) {
      // Hover effect if not disabled
      border-color: #c0c4cc; // Slightly darker border on hover
    }

    // Focus state using :focus-within
    &:focus-within:not(.custom-input--disabled *) {
      border-color: $input-focus-border-color;
      // Optional: Add outline or box-shadow for focus
      // outline: 2px solid rgba($input-focus-border-color, 0.5);
      // outline-offset: 1px;
      box-shadow: 0 0 0 1px rgba($input-focus-border-color, 0.3); // Example focus shadow
    }
  }

  &__input,
  &__textarea {
    flex-grow: 1;
    width: 100%; // Ensure it takes full width within wrapper
    border: none;
    outline: none;
    background: none;
    padding: 0; // Padding is managed by wrapper mostly
    font-size: inherit;
    color: #606266; // Input text color
    line-height: inherit;
    box-sizing: border-box;

    &::placeholder {
      color: $input-placeholder-color;
      opacity: 1; // Ensure placeholder is visible
    }

    &:disabled {
      // Native disabled styles might interfere, ensure consistency
      background: none; // Ensure no native disabled background overrides wrapper
      color: $input-disabled-color;
      cursor: not-allowed;
      -webkit-text-fill-color: $input-disabled-color;
    }
  }

  &__textarea {
    resize: vertical;
    display: block;
    // 使用 CSS 变量 var() 来引用在 :style 中设置的值
    // 注意：calc 内部可以直接进行乘法运算，但单位需要一致或可计算
    // 更好的做法可能是直接在 JS 中计算好最终高度或只传递 rows 数量
    // 这里假设 $input-line-height 也是一个 SCSS 变量 (例如 1.5)
    $input-line-height: 1.5;
    min-height: calc(#{$input-font-size} * #{$input-line-height} * var(--textarea-rows));
    height: auto; // 允许高度根据内容增长
    // 如果 $input-font-size 包含单位 (如 14px)，则需要确保乘法有效
    // 或者在 JS 中计算好：
    // min-height: var(--calculated-min-height); // 并在JS中计算这个值
  }
  // Sections outside the main input wrapper
  &__prepend,
  &__append {
    display: flex;
    align-items: center;
    background-color: #f5f7fa; // Example background for addons
    color: #909399;
    padding: $input-padding-vertical $input-padding-horizontal;
    border: 1px solid $input-border-color;
    box-sizing: border-box;

    // Specific styling for :slotted content might be needed
    :slotted(*) {
      margin: 0; // Reset margins for slotted elements
    }
  }

  &__prepend {
    border-right: none;
    border-radius: $input-border-radius 0 0 $input-border-radius;
  }

  &__append {
    border-left: none;
    border-radius: 0 $input-border-radius $input-border-radius 0;
  }

  // Prefix/Suffix inside the wrapper
  &__prefix,
  &__suffix {
    display: inline-flex;
    align-items: center;
    color: $input-icon-color;
    white-space: nowrap; // Prevent wrapping

    // Add spacing between prefix/suffix and input itself
    // Note: Suffix spacing is handled by button padding below
  }
  &__prefix {
    margin-right: 5px;
  }
  &__suffix {
    margin-left: 5px;
    // Suffix contains icons, handle spacing there
  }

  // Specific Elements (icons, limit)
  &__clear-btn,
  &__password-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 0 3px; // Small padding around icons
    margin: 0; // Reset margin
    cursor: pointer;
    color: $input-icon-color;
    font-size: inherit; // Match input font size if needed
    outline: none; // Remove default button outline

    &:hover {
      color: darken($input-icon-color, 15%);
    }

    .el-icon {
      // Style element-plus icon size if needed
      font-size: 1.1em;
    }
  }

  &__limit {
    font-size: 12px;
    color: $input-icon-color; // Use icon color or specific limit color
    white-space: nowrap;
    margin-left: 8px; // Spacing if both append slot and limit exist
    line-height: inherit; // Align with append content
  }

  // Style slotted elements if needed, e.g., buttons in prepend/append
  &__prepend :slotted(button),
  &__append :slotted(button) {
    margin: (-$input-padding-vertical) (-$input-padding-horizontal); // Make button fill the slot visually
    padding: $input-padding-vertical $input-padding-horizontal;
  }
}
</style>
