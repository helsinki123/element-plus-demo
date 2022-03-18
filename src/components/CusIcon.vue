<template>
  <el-icon :size="size" :color="color">
    <component class="el-icon" :is="icon" />
  </el-icon>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    icon: {
      type: String,
      default: "tools",
    },
    size: {
      type: Number,
      default: 14,
    },
    color: {
      type: String,
      default: "#000000",
    },
  },
  setup(props) {
    let icon = ref(props.icon);
    // 不选择图标的时候，后端会默认传#，如果不做处理会报错
    if (icon.value === "#") {
      icon.value = "tools";
    }
    return {
      icon,
    };
  },
});
</script>
<style lang="scss" scoped></style>
