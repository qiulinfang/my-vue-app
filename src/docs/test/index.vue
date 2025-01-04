<template>
  <button @click="show = !show" v-wave class="wave-button">Toggle</button>
  <SlideTransition>
    <p v-if="show">hello</p>
  </SlideTransition>
  <FadeTransition>
    <p v-if="show">hello</p>
  </FadeTransition>
  <f-button>Button</f-button>
</template>

<script setup>
import { ref } from "vue";
import { FadeTransition,SlideTransition, FButton } from "f-ui";

const show = ref(false);
</script>

<style>


.wave-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #6200ea;
  color: white;
  position: relative;
  overflow: hidden;
}
</style>
