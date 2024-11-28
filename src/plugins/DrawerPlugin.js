// 创建一个全局抽屉插件
const DrawerPlugin = {
  install(app) {
    let drawerInstance = null;

    function openDrawer(title, content) {
      if (!drawerInstance) {
        drawerInstance = app.mount(document.createElement("div"));
      }

      drawerInstance.title = title;
      drawerInstance.content = content;
      drawerInstance.visible = true;
    }

    function closeDrawer() {
      if (drawerInstance) {
        drawerInstance.visible = false;
      }
    }

    app.config.globalProperties.$drawer = {
      open: openDrawer,
      close: closeDrawer,
    };

    app.component("GlobalDrawer", {
      data() {
        return {
          title: "",
          content: "",
          visible: false,
        };
      },
      render() {
        return h(
          ElDrawer,
          {
            title: this.title,
            modelValue: this.visible,
            "onUpdate:modelValue": (value) => {
              this.visible = value;
            },
            direction: "rtl",
            size: "30%",
          },
          [h("span", this.content)]
        );
      },
    });

    app.directive("drawer", {
      mounted(el, binding) {
        el.addEventListener("click", () => {
          app.config.globalProperties.$drawer.open(
            binding.value.title,
            binding.value.content
          );
        });
      },
    });
  },
};

export default DrawerPlugin;