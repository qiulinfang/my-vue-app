<template>
  <div>
    <p>Message: {{ message }}</p>
    <p>Reversed Message (computed): {{ reversedMessage }}</p>
    <p>Watch Message: {{ watchMessage }}</p>
    <p>Directive Message: {{ directiveMessage }}</p>
    <input v-focus1/>
    <button @click="changeMessage">Change Message</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: null,
      watchMessage: '',
      directiveMessage: 'Directive not yet triggered',
    };
  },
  computed: {
    reversedMessage: {
      get() {
        console.log('computed get');
        return this.message.split('').reverse().join('');
      },
      set(newValue) {
        console.log('computed set');
        this.message = newValue.split('').reverse().join('');
      }
    }
  },
  watch: {
    message: {
      handler(newValue, oldValue) {
        console.log(`watch: ${oldValue} -> ${newValue}`);
        this.watchMessage = `Message changed to: ${newValue}`;
      },
      immediate: true
    }
  },
  methods: {
    changeMessage() {
      this.message = 'Hello Vue 3!';
    }
  },
  beforeCreate() {
    console.log('beforeCreate start');
    this.message = 'beforeCreate!';
    setTimeout(() => {
      console.log('setTimeout (beforeCreate)');
    }, 0);
    Promise.resolve().then(() => {
      console.log('Promise (beforeCreate)');
    });
    console.log('beforeCreate end');
  },
  created() {
    console.log('created start');
    this.message = 'created!';
    setTimeout(() => {
      console.log('setTimeout (created)');
    }, 0);

    Promise.resolve().then(() => {
      console.log('Promise (created)');
      this.message = 'created pormise'
    });
    console.log('created end');
  },
  beforeMount() {
    console.log('beforeMount start');
    this.message = 'beforeMount!';
    setTimeout(() => {
      console.log('setTimeout (beforeMount)');
    }, 0);

    Promise.resolve().then(() => {
      console.log('Promise (beforeMount)');
    });
    console.log('beforeMount end');
  },
  mounted() {
    console.log('mounted start');
    this.message = 'mounted!';
    setTimeout(() => {
      console.log('setTimeout (mounted)');
    }, 0);

    Promise.resolve().then(() => {
      console.log('Promise (mounted)');
    });
    console.log('mounted end');
  },
  beforeUpdate() {
    console.log('beforeUpdate start');
    console.log('beforeUpdate end');
  },
  updated() {
    console.log('updated start');
    console.log('updated end');
  },
  beforeDestroy() {
    console.log('beforeDestroy start');
    console.log('beforeDestroy end');
  },
  destroyed() {
    console.log('destroyed start');
    console.log('destroyed end');
  },
  directives: {
    focus1: {
      created() {
        console.log('directive created start');
        console.log('directive created end');
      },
      mounted(el) {
        console.log('directive mounted start');
        el.focus();
        console.log('directive mounted end');
      },
      update() {
        console.log('directive update start');
        console.log('directive update end');
      },
      componentUpdated() {
        console.log('directive componentUpdated start');
        console.log('directive componentUpdated end');
      },
      unbind() {
        console.log('directive unbind start');
        console.log('directive unbind end');
      }
    }
  }
};
</script>

<style scoped>
p {
  font-size: 18px;
}
button {
  padding: 10px;
  background-color: lightblue;
}
</style>
