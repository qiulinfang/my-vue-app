<template>
  <div class="extralist">
    {{ editType }}
    <button @click="handleclick">changehandleclick</button>
    {{ extraType }}
    <button @click="handleextraTypeclick">changeextraType</button>
    <extralist
      v-model="tableData"
      v-model:checked="isChecked"
      :fieldList="fieldList"
      :editType="editType"
      :extraType="extraType"
      :markTip="markTip"
    ></extralist>
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
      markTip: ["考虑你的角色来自哪里，他们的过去是如何塑造他们的性格和技能的。你可以选择一个出生地，这将影响你角色的初始属性、可用技能以及在游戏世界中的起始位置。思考一下你的角色为什么离开家乡，是什么驱使他们踏上冒险之旅？这些决定不仅能够让你的角色更加立体，还可能解锁特定的故事线或任务。", "在分配属性点和选择技能树时，试着找到一种平衡，既能体现你想要的游戏风格，又能适应不断变化的游戏挑战。不要过早地专注于某一项能力而忽略了其他方面的发展；保持灵活性，以便根据遇到的不同情况调整策略。同时，考虑到未来可能会解锁的新装备或技能，它们可能会改变你的玩法。"],
      extraType: "displayExtra",
      editType: "read",	
      isChecked: false,
      tableData: [
        { key: "userName", value: "lsdkfjsdkf" },
        { key: "signature", value: "用户个性签名" },
        { key: "address", value: "中国 北京" },
        { key: "hobby", value: "音乐" },
        { key: "birthday", value: "2022-22-11" },
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
          description:
            "示例：在这片星辰与海洋交织的宇宙画卷中，我是一颗漂泊的心，一面追寻着时间的涟漪，一面在记忆的沙滩上刻画着瞬间的永恒。每一步足迹都是对未知的探索，每一次呼吸都饱含着生命的奇迹。我是那介于梦境与现实之间的行者，在思维的迷宫里寻找出口，同时又享受着迷失的过程。",
        },
        {
          name: "地址",
          key: "address",
          type: "text",
          description:
            "示例：宇宙边缘无限大道123456789号，第九银河系，仙女座星云区，蓝巨星星座，幻影行星，虚无镇，不存在街，无限延长巷，时间停滞处，空间扭曲点，光年之外村，量子波动城，多维空间省，平行世界国，超时空联邦",
        },
        {
          name: "爱好",
          key: "hobby",
          type: "select",
          options: [
            { label: "音乐", value: "音乐" },
            { label: "游戏", value: "游戏" },
            { label: "运动", value: "运动" },
            { label: "阅读", value: "阅读" },
          ],
          description:
            "为你的虚拟角色添加一些兴趣爱好， 让他拥有一些趣事",
        },
        {
          name: "生日",
          key: "birthday",
          type: "date",
          description:
            "为你的虚拟角色添加一些兴趣爱好， 让他拥有一些趣事",
        },
      ],
    };
  },
  computed() {},
  mounted() {},
  methods: {
    handleclick() {
      console.log(this.editType)
      console.log(this.editType == 'read')
      if(this.editType == 'read'){
        this.editType = 'edit'
      } else{
        this.editType = 'read'
      }
    },
    handleextraTypeclick(){
      if(this.extraType == 'displayExtra'){
        this.extraType = 'logicExtra'
      } else{
        this.extraType = 'displayExtra'
      }
    }
  },
};
</script>
