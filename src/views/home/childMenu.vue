<template>
  <el-sub-menu v-if="menu.children.length > 0" :index="menu.index">
    <template #title>
      <el-icon><circle-plus /></el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <template v-for="child in menu.children">
      <menu-tree
        v-if="child.children.length > 0"
        :menu="child"
        :key="child.index"
      ></menu-tree>
      <el-menu-item
        v-else
        :index="child.path"
        :key="child.index"
        @click="jump(child.path)"
        >{{ child.name }}</el-menu-item
      >
    </template>
  </el-sub-menu>
</template>

<script>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CirclePlus, Delete, Search } from "@element-plus/icons-vue";
import { router } from "../../router";
export default {
  name: "menu-tree",
  props: {
    menu: {},
  },
  setup(props, ctx) {
    const router = useRouter();
    const route = useRoute();
    function jump(path) {
      console.log("path", path);
      console.log("finally path", route.path + path);
      // router.go(route.path + path);
    }
    onMounted(() => {});
    console.log("menu", props.menu);
    return {
      jump,
    };
  },
};
</script>

<style lang="scss"></style>
