<template>
    <div>
      <h2>Compare Form Values (Click fields to see old value)</h2>
      <form @click.capture="handleFormClick" class="my-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="newFormData.username"
            data-fieldname="username"
            placeholder="Enter username"
          />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="newFormData.email"
            data-fieldname="email"
            placeholder="Enter email"
          />
        </div>
  
        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea
            id="bio"
            v-model="newFormData.bio"
            data-fieldname="bio"
            rows="4"
            placeholder="Enter bio"
          ></textarea>
        </div>
  
         <div class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="newFormData.status" data-fieldname="status">
              <option value="" disabled>-- Select Status --</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending Review</option>
          </select>
        </div>
  
        <div class="form-group form-group-inline">
          <label>Notifications:</label>
          <div>
              <input
                  type="checkbox"
                  id="notify"
                  v-model="newFormData.notify"
                  data-fieldname="notify"
              />
              <label for="notify" class="inline-label">Enable Email Notifications</label>
          </div>
        </div>
  
         <div class="form-group form-group-inline">
          <label>User Type:</label>
          <div class="radio-group">
              <div>
                   <input type="radio" id="type-admin" value="admin" v-model="newFormData.userType" data-fieldname="userType">
                   <label for="type-admin" class="inline-label">Admin</label>
              </div>
               <div>
                   <input type="radio" id="type-editor" value="editor" v-model="newFormData.userType" data-fieldname="userType">
                   <label for="type-editor" class="inline-label">Editor</label>
              </div>
               <div>
                   <input type="radio" id="type-viewer" value="viewer" v-model="newFormData.userType" data-fieldname="userType">
                   <label for="type-viewer" class="inline-label">Viewer</label>
              </div>
          </div>
        </div>
  
  
        <div style="height: 300px; border: 1px dashed #ccc; margin-top: 20px; padding: 10px; overflow: auto;">
          <p>Scrollable Area Below</p>
          <div style="height: 100px;"></div>
          <p>Test scrolling interaction with the field inside.</p>
          <div class="form-group" style="margin-top: 50px;">
              <label for="inside-scroll">Field Inside Scroll</label>
              <input
                type="text"
                id="inside-scroll"
                v-model="newFormData.insideScroll"
                data-fieldname="insideScroll"
                placeholder="A field within a scrollable div"
              />
          </div>
          <div style="height: 200px;"></div>
          <p>End of scrollable area.</p>
        </div>
  
      </form>
  
      <Teleport to="body">
        <DiffPopover
          v-for="popoverData in activePopovers"
          :key="popoverData.id"
          :target-element="popoverData.targetElement"
          :old-value="popoverData.oldValue"
          :popover-id="popoverData.id"
          :field-name="popoverData.id"
          @close="handlePopoverClose"
        />
      </Teleport>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  import DiffPopover from './DiffPopover.vue'; // Adjust path if necessary
  
  // --- Reactive Form Data ---
  const newFormData = reactive({
    username: 'vue_dev_2025',
    email: 'dev@vue-example.com',
    bio: `Using Vue 3's Composition API and Floating UI for dynamic popovers.
  This text area allows testing multi-line content.`,
    status: 'active',
    notify: true,
    userType: 'admin',
    insideScroll: 'New Value Here'
  });
  
  // Example old data for comparison
  const oldFormData = reactive({
    username: 'vue_dev_2024', // Different username
    email: 'dev@vue-example.com', // Same email
    bio: 'Previously used Vue 2 Options API.', // Different bio
    status: 'pending', // Different status
    notify: false, // Different notification setting
    userType: 'editor', // Different user type
    insideScroll: 'Old Scroll Value Was Different' // Different scroll field value
  });
  
  // --- State for MULTIPLE active popovers ---
  // Key: fieldName (must be unique identifier for the input)
  // Value: { targetElement, oldValue, id }
  const activePopovers = reactive({});
  
  // --- Event Handler for Form Clicks ---
  const handleFormClick = (event) => {
    const target = event.target;
    // Check if the clicked element has the 'data-fieldname' attribute
    const fieldName = target.dataset.fieldname;
  
    // Check if it's a relevant form element type we want to track
    const isTrackedFormElement = target.tagName.match(/^(INPUT|TEXTAREA|SELECT)$/i);
  
    if (fieldName && isTrackedFormElement) {
      const oldValue = oldFormData[fieldName];
      const newValue = newFormData[fieldName];
  
      // Only add if:
      // 1. This field's popover isn't already active
      // 2. An old value is defined for comparison
      // 3. The old and new values are actually different
      if (
          !(fieldName in activePopovers) &&
          oldValue !== undefined && // Ensure old value exists
          String(oldValue) !== String(newValue) // Compare as strings for simplicity, adjust if needed
         ) {
        activePopovers[fieldName] = {
          targetElement: target, // Store the actual DOM element reference
          oldValue: oldValue,
          id: fieldName // Use fieldName as the unique ID
        };
      }
      // Clicking an element with an active popover does nothing.
      // Clicking outside target elements does nothing to existing popovers.
    }
  };
  
  // --- Handler to close a specific popover (triggered by child emit) ---
  const handlePopoverClose = (popoverId) => {
    if (popoverId in activePopovers) {
      // Remove the specific popover's state from the reactive object
      delete activePopovers[popoverId];
    }
  };
  </script>
  
  <style scoped>
  .my-form {
    font-family: sans-serif;
    max-width: 600px;
    margin: 30px auto;
    padding: 25px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  .form-group-inline {
      display: flex;
      align-items: center;
      gap: 15px; /* Space between label and inputs */
  }
  .form-group-inline > label {
      margin-bottom: 0; /* Remove bottom margin for inline label */
      flex-shrink: 0; /* Prevent label from shrinking */
  }
  .radio-group, .checkbox-group {
      display: flex;
      gap: 15px; /* Space between radio/checkbox options */
      flex-wrap: wrap; /* Allow wrapping on smaller screens */
  }
  .radio-group > div, .checkbox-group > div {
      display: flex;
      align-items: center;
  }
  
  label {
    display: block;
    margin-bottom: 6px;
    font-weight: bold;
    color: #333;
  }
  label.inline-label {
      display: inline-block;
      margin-bottom: 0;
      margin-left: 5px; /* Space after radio/checkbox */
      font-weight: normal;
  }
  
  
  input[type="text"],
  input[type="email"],
  textarea,
  select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
    color: #333;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  textarea {
      min-height: 80px;
      vertical-align: top;
      font-family: inherit;
  }
  input[type="checkbox"], input[type="radio"] {
      width: auto; /* Reset width */
      margin-right: 0;
      vertical-align: middle;
      cursor: pointer;
      accent-color: #007bff; /* Style check/radio color */
       width: 1.1em; /* Slightly larger */
      height: 1.1em;
  }
  
  
  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
  
  /* Add a subtle indicator to elements that *could* have a popover (optional) */
  [data-fieldname]:focus {
      /* Example: slightly different focus */
       box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.3); /* Orange glow */
  }
  </style>