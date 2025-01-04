<template>
    <button @click="show = !show" v-wave class="wave-button">Toggle</button>
    <button @click="addItem">Add Item</button>
    <button @click="removeItem">Remove Item</button>
    <button @click="shuffleItems">Shuffle Items</button>
    <SlideTransition>
      <p v-if="show">hello</p>
    </SlideTransition>
    <FadeTransition>
      <p v-if="show">hello</p>
    </FadeTransition>

    <ListTransition :items="items"></ListTransition>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { FadeTransition, SlideTransition, ListTransition, FButton } from "f-ui";
  const items = ref([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ]);
  const addItem = () => {
    const newItem = { id: Date.now(), text: `Item ${items.value.length + 1}` };
    items.value.push(newItem);
  };
  
  const removeItem = () => {
    items.value.pop();
  };
  
  const shuffleItems = () => {
    items.value = [...items.value].sort(() => Math.random() - 0.5);
  };
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
  