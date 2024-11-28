<template>
  <div>
    <el-button v-click-log="'Hello, Vue! Clicked!'">指令button</el-button>
    <el-input v-compare-numbers="[10, 20]"></el-input>
  </div>
</template>

<script>
export default {
  name: "direct",
  data() {
    return { arguments: [] };
  },
  mounted() {
    console.log("🚀 ~ data ~ arguments:", arguments)
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>
