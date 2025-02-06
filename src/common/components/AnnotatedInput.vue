<template>
  <div>
    {{ inputValue }}
    <el-input
      v-model="computedInputValue"
      @keydown="handleKeydown"
      @blur="handleBlur"
      @focus="handleFocus"
      placeholder="请输入内容"
      ref="input"
      style="position: relative"
    >
      <template #append>
        <el-icon @click="fetchInputAndComment"><MoreFilled /></el-icon>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      isFocused: false,
      comment: "",
    };
  },
  computed: {
    computedInputValue: {
      get() {
        return this.isFocused || !this.inputValue
          ? this.inputValue
          : this.inputValue + `[${this.comment}]`;
      },
      set(value) {
        this.inputValue = value.replace(`[${this.comment}]`, "");
      },
    },
  },
  methods: {
    handleKeydown(event) {
      if (event.target.value.includes("[注释]")) {
        const commentIndex = event.target.value.indexOf("[注释]");
        if (event.target.selectionStart >= commentIndex) {
          event.preventDefault();
        }
      }
    },
    handleBlur() {
      this.isFocused = false;
      this.fetchComment();
    },
    handleFocus() {
      this.isFocused = true;
    },
    fetchComment() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = true; // Simulate success or failure
          if (success) {
            resolve({ comment: "This is a simulated comment" });
          } else {
            reject("Error fetching comment");
          }
        }, 0);
      })
        .then((data) => {
          this.comment = data.comment;
        })
        .catch((error) => {
          console.error("Error fetching comment:", error);
        });
    },
    fetchInputAndComment() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = true; // Simulate success or failure
          if (success) {
            resolve({
              inputValue: "Fetched input value",
              comment: "Fetched comment",
            });
          } else {
            reject("Error fetching input and comment");
          }
        }, 0);
      })
        .then((data) => {
          this.computedInputValue = data.inputValue;
          this.comment = data.comment;
        })
        .catch((error) => {
          console.error("Error fetching input and comment:", error);
        });
    },
  },
};
</script>

<style scoped>
.el-icon-more {
  cursor: pointer;
}
</style>
