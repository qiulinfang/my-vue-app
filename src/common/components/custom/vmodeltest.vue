<template>
  {{isUsername}}
  {{username}}
  {{email}}
    <div>
      <button @click="isUsername = !isUsername">切换</button>
      <input v-model="currentValue" :type="inputType" :placeholder="placeholder">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isUsername: true,
        username: '',
        email: ''
      };
    },
    computed: {
      currentValue: {
        get() {
          return this.isUsername ? this.username : this.email;
        },
        set(value) {
          if (this.isUsername) {
            this.username = value;
          } else {
            this.email = value;
          }
        }
      },
      inputType() {
        return this.isUsername ? 'text' : 'email';
      },
      placeholder() {
        return this.isUsername ? 'Enter username' : 'Enter email';
      }
    }
  };
  </script>
  