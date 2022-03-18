<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="wrap">
          管理系统
          <el-menu router="true">
            <template v-for="menu in menuData">
              <menuTree
                v-if="menu.children.length > 0"
                :key="menu.index"
                :menu="menu"
              ></menuTree>
            </template>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 用户信息 -->
          <div class="top">
            <breadcrumb></breadcrumb>
            <div class="user-info">
              <el-dropdown>
                <span class="el-dropdown-link">
                  管理员

                  <el-icon><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="showPasswordLayer"
                      >修改密码</el-dropdown-item
                    >
                    <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div v-for="item in menuList" :key="item.path">{{ item.meta.title }}</div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <p class="copyright_p" style="line-height: 19px">
    <span style="display: inline-block; padding-top: 5px">XXX科技有限公司</span
    ><br /><span
      >Copyright©2015
      <a href="http://www.eventdove.com/index.html">EventDove.com</a> 版权所有
      苏ICP备&nbsp;<a href="http://www.miitbeian.gov.cn">10211262</a
      >号&nbsp;苏ICP证&nbsp;<a href="http://www.miitbeian.gov.cn">B1-20150298</a>号</span
    >
  </p>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted } from "vue";
import menuTree from "./childMenu.vue";
import breadcrumb from "@comps/breadCumb/index.vue";
// import head from "@/Header/index.vue";
import { ArrowDown } from "@element-plus/icons-vue";
import CusIcon from "@/components/CusIcon.vue";
import crudTable from "@views/crudTable/index.vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "menufather",
  components: {
    menuTree,
    breadcrumb,
    crudTable,
  },
  props: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    let menuList = ref([]);

    const defaultMenu = {
      path: "/testMenu",
      meta: { title: "首页", hideClose: true },
    };
    if (menuList.value.length === 0) {
      // 判断之前有没有调用过
      addMenu(defaultMenu);
    }
    // 添加新的菜单项
    function addMenu(menu) {
      let { path, meta, name } = menu;
      if (meta.hideTabs) {
        return;
      }
      let hasMenu = menuList.value.some((obj) => {
        return obj.path === path;
      });
      if (!hasMenu) {
        menuList.value.push({
          path,
          meta,
          name,
        });
      }
    }
    router.afterEach((to, from) => {
      addMenu(route);
    });

    const menuData = reactive([
      {
        index: "1",
        name: "首页",
        icon: "",
        children: [
          {
            index: "1-1",
            name: "测试",
            path: "",
            children: [
              {
                index: "1-6-1",
                name: "crudTable",
                path: "/crudTable",
                children: [],
              },
            ],
          },
          {
            index: "1-5",
            name: "1-5",
            path: "",
            children: [
              {
                index: "1-6-1",
                name: "1-6-1",
                path: "",
                children: [],
              },
            ],
          },
        ],
      },
      {
        index: "2",
        name: "父级",
        icon: "",
        children: [
          {
            index: "2-1",
            name: "2-1子级",
            path: "",
            children: [],
          },
        ],
      },
    ]);
    return {
      menuData,
      menuList,
      defaultMenu,
      addMenu,
    };
  },
};
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: var(--system-header-background);
  padding-right: 22px;
}
.right-box {
  display: flex;
  justify-content: center;
  align-items: center;
  .function-list {
    display: flex;
    .function-list-item {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      :deep(i) {
        color: var(--system-header-text-color);
      }
    }
  }
  .user-info {
    margin-left: 20px;
    .el-dropdown-link {
      color: var(--system-header-breadcrumb-text-color);
    }
  }
}
.wrap {
  width: 200px;
  height: 100vh;
  background-color: aqua;
}
// p {
//   width: 200px;
//   height: 200px;
//   margin-top: 50px;
//   background-color: aqua;
// }
</style>
