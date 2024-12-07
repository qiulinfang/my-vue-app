<template>
  <div class="extralist">
    <extralist v-model="tableData"  v-model:checked="isChecked" :fieldList="fieldList"></extralist>
    {{ isChecked }}
        {{ tableData }}
  </div>
</template>

<script>
import extralist from "../components/extralist.vue";
export default {
  name: "sdfsdfsd",
  components: {
    extralist,
  },
  data() {
    return {
        isChecked: false,
      tableData: [
        { key: "userName", value: 'lsdkfjsdkf' },
        { key: "signature", value: "用户个性签名" },
        { key: "address", value: "中国 北京" },
      ],
      fieldList: [
        {
          name: "用户名",
          key: "userName",
          type: "text",
          description: "用户登录名",
        },
        {
          name: "个性签名",
          key: "signature",
          type: "text",
          description: "示例：在这片星辰与海洋交织的宇宙画卷中，我是一颗漂泊的心，一面追寻着时间的涟漪，一面在记忆的沙滩上刻画着瞬间的永恒。每一步足迹都是对未知的探索，每一次呼吸都饱含着生命的奇迹。我是那介于梦境与现实之间的行者，在思维的迷宫里寻找出口，同时又享受着迷失的过程。",
        },
        {
          name: "地址",
          key: "address",
          type: "text",
          description: "示例：宇宙边缘无限大道123456789号，第九银河系，仙女座星云区，蓝巨星星座，幻影行星，虚无镇，不存在街，无限延长巷，时间停滞处，空间扭曲点，光年之外村，量子波动城，多维空间省，平行世界国，超时空联邦",
        },
      ],
    };
  },
  computed() {},
  mounted() {},
  methods: {},
};
</script>
