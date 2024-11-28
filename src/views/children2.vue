<template>
  <el-table :data="tabdata" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>
    
<script>
export default {
  name: "childeren2",
  props: {
    tabdata: {
      type: Array,
      Required: true,
    },
  },

  data() {
    return {};
  },
  methods: {},
};
</script>
    