export const useFocus = (el) => {
  return {
    focus: () => {
      el.value?.focus?.()
    },
  }
}
