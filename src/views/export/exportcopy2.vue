<template>
  <div>
    <baidu-map class="bm-view"> </baidu-map>
    <div ref="main" id="main">aaa</div>
    <!-- <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload> -->

    <div class="box1">aaa</div>

    <el-space wrap>
      <el-card v-for="i in 10" :key="i" class="box-card" style="width: 250px">
        <template #header>
          <div class="card-header">
            <span>Card name</span>
            <el-button class="button" type="text">Operation button</el-button>
          </div>
        </template>
        <div v-for="o in 5" :key="o" class="text item">
          {{ "List item " + o }}
        </div>
      </el-card>
    </el-space>
    <div class="index index_box3">
      <div class="echartbox boxshow">
        <div class="echart_left">
          <div class="echartbox_title">告警统计(按区域)</div>
          <div class="echartbox_con" ref="barChar" id="barChar"></div>
        </div>
        <div class="echart_right">
          <div class="echartbox_title">当前告警统计</div>
          <div class="echartbox_con" id="piemoreChar"></div>
        </div>
      </div>
    </div>

    <div id="container" class="loncom_content" ref="container"></div>
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
import * as echarts from "echarts";
import { ref, unref, onMounted } from "vue";

import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

// var _this = this;
// 百度地图API功能
let map = new BMap.Map("container");
//this.map.centerAndZoom(new BMap.Point(119.045403, 31.69525), 13); //初始化地图,设置中心点坐标和地图级别3-19
map.centerAndZoom(new BMap.Point(110.68789, 19.94395), 8);
map.enableScrollWheelZoom();

function hbarChar(ID) {
  var xMax = 1600;
  var dataShadow = [];
  var yData = [
    "1号池塘",
    "2号池塘",
    "3号池塘",
    "4号池塘",
    "5号池塘",
    "6号池塘",
    "7号池塘",
  ];
  for (var i = 0; i < yData.length; i++) {
    dataShadow.push(xMax);
  }
  var myChart = echarts.init(barChar.value);

  var option = {
    color: ["#C5051B", "#FF1A07", "#FF7B00", "#FFA300"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
      //formatter: '{b}：{c}'
    },
    grid: {
      top: "20px",
      bottom: "20px",
      left: "15px",
      right: "5px",
      containLabel: true,
    },
    legend: {
      top: "0px",
      right: "15px",
      textStyle: {
        color: "#000",
      },
      data: ["一级告警", "二级告警", "三级告警", "四级告警"],
    },
    xAxis: {
      type: "category",
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#000",
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#666",
          width: 1,
        },
      },
      axisLabel: {
        interval: 0,
        rotate: -50,
        color: "#000",
      },
      data: yData,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#ccc",
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#666",
          width: 1,
        },
      },
    },
    series: [
      // { // For shadow
      //     type: 'bar',
      //     itemStyle: {
      //         normal: {color: '#434343'}
      //     },
      //     barGap:'-100%',
      //     barCategoryGap:'0%',
      //     data: dataShadow,
      //     animation: false
      // },
      {
        name: "一级告警",
        type: "bar",
        stack: "all",
        barWidth: "30%",
        data: [1, 0, 0, 0, 1, 0, 0],
      },
      {
        name: "二级告警",
        type: "bar",
        stack: "all",
        barWidth: "30%",
        data: [0, 1, 0, 0, 0, 0, 0],
      },
      {
        name: "三级告警",
        type: "bar",
        stack: "all",
        barWidth: "30%",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "四级告警",
        type: "bar",
        stack: "all",
        barWidth: "30%",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };
  myChart.setOption(option, true);
  return myChart;
}
// import { UploadFile, UploadRawFile, UploadProgressEvent } from "element-plus";
const main = ref();
const barChar = ref();
onMounted(() => {
  console.log(main.value);
  var myChart = echarts.init(main.value);
  // 绘制图表
  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
  hbarChar("barChar");
  var xData = ["PH值", "溶解氧", "水位", "温度"];
  var yData = [
    { value: 5, name: "PH值" },
    { value: 5, name: "溶解氧" },
    { value: 2, name: "水位" },
    { value: 6, name: "温度" },
  ];
  var allAlarm = 18;
  // piemoreChar("piemoreChar", xData, yData, allAlarm);
});
const imageUrl = ref("");
const handleAvatarSuccess = (res, file) => {
  imageUrl.value = URL.createObjectURL(file.raw);
};
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error("Avatar picture must be JPG format!");
  }
  if (!isLt2M) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
  }
  return isJPG && isLt2M;
};

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
.bm-view {
  width: 100%;
  height: 300px;
}
#main,
#container {
  width: 500px;
  height: 500px;
  border: 1px solid black;
}
.echartbox_con {
  width: 500px;
  height: 500px;
  border: 1px solid black;
}
.index_box3 {
  width: 100%;
  height: 800px;
}
.echartbox_con {
  width: 100%;
  height: calc(100% - 35px);
  height: 500px;
}
.box1 {
  height: 200px;
  width: 90%;
  margin: 10px;
  background-color: goldenrod;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.loncom_left_navcon li dl {
  background: #d0f0f5;
  display: none;
}
.loncom_left_navcon li .router-link-active dl {
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
