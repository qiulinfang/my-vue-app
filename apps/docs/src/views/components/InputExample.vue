<template>
  <div class="usage-examples">
    <h1>MyInput Usage Examples</h1>

    <div class="example-container">
      <h3>1. Basic Input</h3>
      <MyInput v-model="basicValue" placeholder="Enter some text" />
      <p>Value: {{ basicValue }}</p>
    </div>

    <div class="example-container">
      <h3>2. Password Input</h3>
      <MyInput
        v-model="passwordValue"
        type="password"
        showPassword
        placeholder="Enter password"
      />
    </div>

    <div class="example-container">
      <h3>3. Textarea with Word Limit</h3>
      <MyInput
        v-model="textareaValue"
        type="textarea"
        :rows="4"
        :maxlength="100"
        showWordLimit
        placeholder="Enter long text (max 100 chars)"
      />
    </div>

    <div class="example-container">
      <h3>4. Clearable Input</h3>
      <MyInput
        v-model="clearableValue"
        clearable
        placeholder="Type something and hover/focus to clear"
        @clear="handleClear"
      />
      <p v-if="cleared">Input was cleared!</p>
    </div>

    <div class="example-container">
      <h3>5. Disabled and Readonly</h3>
      <MyInput
        v-model="disabledValue"
        disabled
        placeholder="Disabled input"
      />
      <br />
      <MyInput
        v-model="readonlyValue"
        readonly
        placeholder="Readonly input"
      />
    </div>

    <div class="example-container">
      <h3>6. Using Slots (Prepend/Append)</h3>
      <MyInput v-model="websiteValue" placeholder="your-site">
        <template #prepend>https://</template>
        <template #append>.com</template>
      </MyInput>
      <br />
      <MyInput v-model="searchValue" placeholder="Search...">
        <template #append>
          <button @click="performSearch" class="search-button">Go</button>
        </template>
      </MyInput>
    </div>

    <div class="example-container">
      <h3>7. Using Slots (Prefix/Suffix)</h3>
      <MyInput v-model="userValue" placeholder="Username">
        <template #prefix>👤</template> </MyInput>
      <br />
      <MyInput v-model="amountValue" placeholder="Amount">
         <template #prefix>$</template>
         <template #suffix>USD</template>
      </MyInput>
      <br/>
       <MyInput v-model="iconSuffixValue" placeholder="Input with icon suffix">
         <template #suffix>
            <el-icon title="Information"><InfoFilled /></el-icon> </template>
      </MyInput>
    </div>

    <div class="example-container">
      <h3>8. Using Formatter/Parser (Currency Example)</h3>
      <MyInput
        v-model="currencyValue"
        placeholder="Enter amount"
        :formatter="currencyFormatter"
        :parser="currencyParser"
      />
      <p>Internal value: {{ currencyValue }}</p>
    </div>

    <div class="example-container">
        <h3>9. Programmatic Focus/Blur</h3>
        <MyInput ref="progInputRef" v-model="progValue" placeholder="Click buttons below" />
        <button @click="focusInput">Focus Input</button>
        <button @click="blurInput">Blur Input</button>
    </div>

    <div class="example-container">
      <h3>10. Event Handling</h3>
      <MyInput
        v-model="eventValue"
        placeholder="Try typing, focusing, blurring"
        @input="logEvent('input', $event)"
        @change="logEvent('change', $event)"
        @focus="logEvent('focus')"
        @blur="logEvent('blur')"
        @keydown="logEvent('keydown', $event.key)"
      />
      <pre class="event-log">Event Log:\n{{ eventLog.join('\n') }}</pre>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MyInput } from "myComponent";
// Assuming you might use Element Plus icons in slots or for example purposes
import { InfoFilled } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus'; // If using ElIcon in slots

// Data refs for v-model
const basicValue = ref('');
const passwordValue = ref('');
const textareaValue = ref('');
const clearableValue = ref('Initial text');
const disabledValue = ref('Disabled Content');
const readonlyValue = ref('Readonly Content');
const websiteValue = ref('google');
const searchValue = ref('');
const userValue = ref('');
const amountValue = ref('');
const iconSuffixValue = ref('');
const currencyValue = ref(1234.5); // Store as number internally
const progValue = ref('');
const eventValue = ref('');

// Refs for components
const progInputRef = ref(null);

// State for examples
const cleared = ref(false);
const eventLog = ref([]);

// --- Methods for Examples ---

// 4. Clearable Input Handler
const handleClear = () => {
  console.log('Input cleared!');
  cleared.value = true;
  setTimeout(() => cleared.value = false, 2000); // Reset message after 2s
};

// 6. Search Button Handler
const performSearch = () => {
  alert(`Searching for: ${searchValue.value}`);
};

// 8. Formatter/Parser Functions
const currencyFormatter = (value) => {
  if (value === null || value === undefined || value === '') return '';
  // Format to currency string (e.g., $1,234.50)
  return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const currencyParser = (value) => {
  // Parse string back to number, removing '$' and ','
  if (!value) return '';
  const numStr = String(value).replace(/[$,]/g, '');
  const num = parseFloat(numStr);
  return isNaN(num) ? '' : num; // Return number or empty string if invalid
};

// 9. Programmatic Focus/Blur
const focusInput = () => {
  progInputRef.value?.focus(); // Use optional chaining
};
const blurInput = () => {
  progInputRef.value?.blur(); // Use optional chaining
};

// 10. Event Logger
const logEvent = (eventName, payload = '') => {
  const logEntry = `[${new Date().toLocaleTimeString()}] ${eventName}${payload ? ': ' + String(payload) : ''}`;
  eventLog.value.unshift(logEntry); // Add to beginning
  if (eventLog.value.length > 5) {
    eventLog.value.pop(); // Keep log size limited
  }
  console.log(logEntry);
};

</script>

<style scoped>
/* Add some basic styling for the examples page */
.usage-examples {
  font-family: sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.example-container {
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.example-container h3 {
  margin-top: 0;
  color: #333;
}

/* Ensure inputs take appropriate width */
.custom-input {
   margin-bottom: 10px; /* Add space below inputs */
   /* width: 100%; Default width is 100% in component styles */
}

/* Style the example search button */
.search-button {
  background-color: #6082d8;
  color: white;
  border: none;
  padding: 0 15px; /* Adjust padding */
  height: 100%; /* Fill append slot height */
  cursor: pointer;
  border-radius: 0 4px 4px 0; /* Match input border radius */
  margin: -9px -13px; /* Negative margin to fill padding, adjust based on $input-padding-vertical/horizontal */
  font-size: 14px;
  display: inline-flex;
  align-items: center;
}
.search-button:hover {
  background-color: #4a6ac1;
}

/* Style example buttons */
button {
    margin-right: 10px;
    padding: 5px 10px;
    cursor: pointer;
}

/* Event log styling */
.event-log {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  font-size: 0.9em;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 150px;
  overflow-y: auto;
  border-radius: 4px;
}

/* Style icons used in slots */
.el-icon {
    vertical-align: middle; /* Align icons better */
    margin: 0 2px; /* Slight spacing */
}
</style>