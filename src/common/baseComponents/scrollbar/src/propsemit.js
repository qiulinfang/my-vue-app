import { ref, toRefs } from "vue";

export const scrollbarProps = {
  initialCount: {
    type: Number,
    default: 0,
  },
  msg: {
    type: String,
    required: true,
  },
  /**
   * @description class of wrap
   */
  wrapClass: {
    type: [String, Array],
    default: '',
  },
  wrapStyle: {
    type: String,
  },
  height: {
    type: [String, Number],
    default: "100%",
  },
  maxheight: {
    type: [String, Number],
    default: "100%",
  },
};

export const scrollbarEmits = ["scroll"];
