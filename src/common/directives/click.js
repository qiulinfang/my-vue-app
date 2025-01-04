export const click = {
  mounted(el) {
    el.addEventListener("click", function () {
      console.log("click");
    });
  },
};