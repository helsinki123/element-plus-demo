<template>
  <div class="box">
    <el-aside style="background-color: #545c64" width="">
      <el-menu
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        default-active="/home"
        :collapse="isCollapse"
        :class="{ myMenu: isActive }"
        router="true"
      >
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-data"></i>
            <span>echarts</span>
          </template>
          <el-menu-item index="/exportcom/test2">仪表盘</el-menu-item>
          <el-menu-item index="/charts/bar">柱状图</el-menu-item>
          <el-menu-item index="/charts/line">折线图</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
const columns = [
  {
    title: "name",
    dataIndex: "name",
    width: "25%",
  },
  {
    title: "age",
    dataIndex: "age",
    width: "15%",
  },
  {
    title: "address",
    dataIndex: "address",
    width: "40%",
  },
];
const data = [];

for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
</script>
<script setup>
import { ref, unref } from "vue";
const navbtn = "open";
const tableData = ref(data);
const exportExcelName = ref("");
const handleExportExcel = () => {
  // let fileName = unref(exportExcelName);
  // if (!fileName.trim()) {
  //   message.info('文件名为空')
  //   return
  // }
  const header = ["id", "name", "age", "address"];
  // const data = unref(tableData).map((item) => [
  //   item.id,
  //   item.name,
  //   item.age,
  //   item.address,
  // ]);
  // console.log("data2", data);
  const data = [
    ["1", "zzm", "25", "addresstest"],
    ["1", "zzm", "25", "addresstest"],
    ["1", "zzm", "25", "addresstest"],
    ["1", "zzm", "25", "addresstest"],
  ];
  const fileName = "zzm";
  import("@/Excel/Export2Excel").then(({ arrayToExcel }) => {
    arrayToExcel({ header, data, fileName });
  });
};

const leftNavList = [
  {
    fullName: "操作日志1",
    icon: "",
    name: "日志",
    url: "",
    item: [
      {
        fullName: "操作日志",
        icon: "",
        name: "日志",
        url: "",
      },
      {
        fullName: "操作日志",
        icon: "",
        name: "日志",
        url: "",
      },
    ],
  },
  {
    fullName: "操作日志2",
    icon: "",
    name: "日志",
    url: "",
    item: [
      {
        fullName: "操作日志",
        icon: "",
        name: "日志",
        url: "",
      },
      {
        fullName: "操作日志",
        icon: "",
        name: "日志",
        url: "",
      },
    ],
  },
];
</script>
<style>
.box {
  width: 100px;
  height: 200px;
  background-color: aqua;
}
.loncom_left_navcon li dl {
  background: #d0f0f5;
  display: none;
}
.loncom_left_navcon li .router-link-active dl {
  display: block;
}
</style>
