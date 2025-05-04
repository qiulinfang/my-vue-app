<template>
  <MyInput
    type="text"
    v-model="value1"
    :clearable="true"
    :autocomplete="true"
    minlength="3"
    maxlength="8"
    :showWordLimit="true"
    :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
  >
    <template #prepend>prepend</template>
    <template #prefix>prefix</template>
    <template #suffix>suffix</template>
    <template #append></template>
  </MyInput>
  {{ value3 }}
  <MyInput
    type="textarea"
    v-model="value3"
    :clearable="true"
    :autocomplete="true"
    minlength="3"
    maxlength="8"
    :showWordLimit="true"
  >
    <template #prepend>prepend</template>
    <template #prefix>prefix</template>
    <template #suffix>suffix</template>
    <template #append></template>
  </MyInput>
  <div v-if="value1.includes('s')">sldfj</div>
  <MyInput
    v-model="value1"
    :clearable="true"
    :autocomplete="true"
    @input="(val) => console.log(val)"
  >
  </MyInput>
  {{ value1 }}
  <MyInput v-model="value2" type="textarea" :disabled="true" :clearable="true"></MyInput>
  {{ value2 }}
  <MyInput v-model="value2" type="text" :clearable="true" :showPassword="true">
    <template #append></template>

  </MyInput>
  {{ value2 }}
</template>

<script setup>
import { MyInput } from "myComponent";

const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
</script>

<style scoped></style>
