import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from "vue-router";
import login from "../views/login/login.vue"
import home from "@views/home/index.vue"
import testmenu from "@views/home/testmenu.vue"
import crudTable from "@views/crudTable/index.vue"
import exportcom from "@views/export/export.vue"
import test1 from "@views/export/exportcopy.vue"
import test2 from "@views/export/exportcopy2.vue"




// 路由信息
const routes = [{
    path: "/",
    redirect: "/home",
    meta: {
      title: "index",
      keepAlive: false,
      level: 0
    },
  },
  {
    path: "/login",
    name: login,
    component: login,
    meta: {
      title: "login",
      keepAlive: false,
      level: 0
    },
  },
  {
    path: "/home",
    component: home,
    meta: {
      title: "home",
      keepAlive: false,
      level: 0
    },
  },
  {
    path: "/testmenu",
    component: testmenu,
    meta: {
      title: "testmenu",
      keepAlive: false,
      level: 0
    },
    children: [{
      path: "/crudTable",
      component: crudTable,
      meta: {
        title: "crudTable",
        keepAlive: false,
        level: 0
      },
    }, ]
  },
  {
    path: "/exportcom",
    component: exportcom,
    meta: {
      title: "exportcom",
      keepAlive: false,
      level: 0
    },
    children:[
      {
        path: "test1",
        component: test1,
        meta: {
          title: "test1",
          keepAlive: false,
          level: 0
        },
      },
      {
        path: "test2",
        component: test2,
        meta: {
          title: "test2",
          keepAlive: false,
          level: 0
        },
      },
    ]
  },

];


// 导出路由
const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(),
  routes
});


export {
  routes,
  router
};