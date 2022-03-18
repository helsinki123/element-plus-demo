<template>
  <div>
    <router-view></router-view>
    <div class="table-title">
      <div class="table-title-item">
        <a-input v-model:value="exportExcelName" :placeholder="aa" />
        <a-button style="margin-left: 16px" @click="handleExportExcel">导出</a-button>
      </div>
    </div>
    <!-- <a-table :columns="columns" :data-source="tableData" bordered></a-table> -->
    <ul class="loncom_left_navcon">
      <li v-for="item in leftNavList" :key="item.name">
        <router-link :to="item.url" ref="lon_link">
          <div class="lon_nav" ref="lon_nav" @click="moreNav($event)">
            <em><img :src="item.icon" /></em>
            <span v-if="navbtn == 'close'">{{ item.name }}</span>
            <span v-if="navbtn == 'open'">{{ item.fullName }}</span>
            <!--<i v-if="navbtn=='open'&&item.item&&item.item.length>0"><img src="static/images/sanjiao.png"></i>-->
          </div>
          <dl v-show="navbtn == 'open'">
            <dd v-for="inItem in item.item" :key="inItem.fullName">
              <router-link :to="inItem.url">
                <em><img :src="inItem.icon" /></em>
                <span>{{ inItem.fullName }}</span>
              </router-link>
            </dd>
          </dl>
        </router-link>
      </li>
    </ul>
    <p><router-link to="/exportcom">Go to Foo</router-link></p>
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
    fullName: "aa",
    icon: "",
    name: "aa日志",
    url: "/exportcom/test1",
    item: [
      {
        fullName: "test1",
        icon: "",
        name: "test1",
        url: "/exportcom/test1",
      },
    ],
  },
  {
    fullName: "bb",
    icon: "",
    name: "bb日志",
    url: "/exportcom/test2",
    item: [
      {
        fullName: "test2",
        icon: "",
        name: "test2",
        url: "/exportcom/test2",
      },
    ],
  },
];
</script>
<style>
.loncom_left_navcon li dl {
  background: #d0f0f5;
  display: none;
}
.loncom_left_navcon li .router-link-active dl {
  display: block;
}
</style>
