<template>
  <div style="width: 80%; margin: 0 auto; text-align: center;">
    <el-row style="padding-top: 48px;">
      <el-col :span="2"
        ><div class="grid-content bg-purple">
          <el-button type="text">化学式 :</el-button>
        </div>
      </el-col>
      <el-col :span="11"
        ><div class="grid-content bg-purple">
          <el-input v-model="smiles" placeholder="请输入内容"></el-input>
        </div>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple">
          <el-button type="primary" round @click="sendSmiles"
            >generate</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-row
      style="width: 60%; text-align: center; padding-top: 32px; padding-bottom: 32px;"
    >
      <el-col :span="24">
        <div v-if="imageUrl">
          <img style="width: 400px;" :src="imageUrl" alt="化学结构图像" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button type="text">策略:</el-button>
        </div>
      </el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="3"
        ><div class="grid-content bg-purple">
          <el-button
            type="primary"
            round
            @click="getItemsData"
            :disabled="!this.smileInputDisable"
            >Running</el-button
          >
        </div></el-col
      >
    </el-row>
    <el-row
      style="width: 70%; text-align: center; padding-top: 32px; padding-bottom: 32px;  padding-left: 32px;"
    >
      <el-col :span="2">
        <span>{{ status }}</span>
      </el-col>
      <el-table :data="tableData" style="width: 40%" :show-header="false">
        <el-table-column prop="name" label="指标" width="180">
        </el-table-column>
        <el-table-column prop="value" label="值"> </el-table-column>
      </el-table>
    </el-row>
    <el-row style="width: 60%; text-align: center;">
      <div style="display: flex; margin-top: 30px;">
        <div
          v-for="(item, index) in molsPic"
          :key="index"
          style="padding-left: 32px; padding-right: 32px;"
        >
          <img style="width: 180px;" :src="item" alt="化学结构图像" />
          <span>{{ legends[index] }}</span>
        </div>
        <!-- <div
          v-for="(item, index) in molsTitle"
          :key="index"
          style="padding-left: 32px; padding-right: 32px;"
        >
          <span>{{ item }}</span>
        </div> -->
      </div>
    </el-row>
    <el-row class="scrollable-row">
      <iframe
        class="frame"
        id="idKetcher"
        src="./standalone/index.html"
        width="100%"
        height="600"
        v-show="false"
      ></iframe>
    </el-row>
    <el-row class="scrollable-row">
      <div id="myTreeEchart" ref="myTreeEchart"></div>
    </el-row>
    <el-row>
      <div v-for="(item, index) in detailData">
        <div>{{ index + 1 }}</div>
        <div>{{ item }}</div>
      </div>
    </el-row>
  </div>

  <!-- <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容' + o }}
  </div>
</el-card> -->

  <!-- <div style="display: flex;margin-bottom: 30px;">
      <div
        v-for="(item, index) in molsPic"
        :key="index"
        style="margin-right: 30px;border-right: 1px solid #ccc;"
      >
        <img style="width: 200px;" :src="item" alt="化学结构图像" />
      </div>
    </div>
    <iframe
      class="frame"
      id="idKetcher"
      src="./standalone/index.html"
      width="800"
      height="600"
      v-show="false"
    />
    <div
      id="myTreeEchart"
      :style="{ height: '100%', width: '100%' }"
      ref="myTreeEchart"
    ></div>

    <div>
      <div v-for="(item, index) in detailData">
        <div>{{ index + 1 }}</div>
        <div>{{ item }}</div>
      </div>
    </div>
  </div> -->

  <!-- <div class="echarts">
        <div style="display: flex;">

            <el-input v-model="smiles" placeholder="请输入内容"></el-input>
            <Input v-model="smiles" style="margin-right: 10px;"></Input>
            <Button @click="sendSmiles" style="padding: 0;" :disabled="!this.smileInputDisable">Send Smiles</Button>
            <el-button type="primary" round @click="sendSmiles" style="padding: 0;" :disabled="!this.smileInputDisable">generate</el-button>
        </div>
        <button @click="gogo">111</button>
        <button @click="run">run</button>
        <div v-if="imageUrl">
            <img style="width: 400px;" :src="imageUrl" alt="化学结构图像" />
        </div>

        <div>
            <Button @click="getItemsData" style="padding: 0;" :disabled="!this.smileInputDisable">Running</Button>
        </div>
        <div style="display: flex;margin-bottom: 30px;">
            <div v-for="(item, index) in molsPic" :key="index" style="margin-right: 30px;border-right: 1px solid #ccc;">
                <img style="width: 200px;" :src="item" alt="化学结构图像" />
            </div>
        </div>
        <iframe class="frame" id="idKetcher" src="./standalone/index.html" width="800" height="600" v-show="false" />
        <div id="myTreeEchart" :style="{ height: '100%', width: '100%' }" ref="myTreeEchart">
        </div>

        <div>
            <div v-for="(item, index) in detailData">
                <div>{{ index + 1 }}</div>
                <div>{{ item }}</div>
            </div>
        </div>
    </div> -->
</template>

<script>
import echarts from "echarts";
import { getItems, get_synthesis_steps } from "@/api/moleculeIndex";
import { Input } from "iview";

export default {
  name: "TreeChart",
  components: {},
  data() {
    return {
      smiles: "",
      smileInputDisable: true,
      loading: false,
      ketcher: null,
      value: "",
      testdata: {},
      transformedData: "",
      imageUrl: "",
      detailData: [],
      tableData: [],
      all_score: {},
      molsPic: [],
      molsTitle: [],
      options: [
        {
          value: "0",
          label: "upsto"
        },
        {
          value: "1",
          label: "ringbreaker"
        },
        {
          value: "2",
          label: "editretro"
        }
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initKetcher();
      }, 500);
    });
  },
  mounted() {
    // this.getItemsData()
  },
  beforeDestroy() {},
  methods: {
    initKetcher() {
      let ketcherFrame = document.getElementById("idKetcher");
      let ketcher = null;
      if ("contentDocument" in ketcherFrame) {
        ketcher = ketcherFrame.contentWindow.ketcher;
      } else {
        ketcher = document.frames["idKetcher"].window.ketcher;
      }
      console.log("let ketcher", ketcher);
      this.ketcher = ketcher;
    },
    gogo() {
      this.initEcharts();
    },
    run() {
      get_synthesis_steps();
    },
    async sendSmiles() {
      let res = await this.recognizeMolecule(this.smiles);
      this.imageUrl = res;
    },
    // 提交识别结果（SMILES）
    async recognizeMolecule(name) {
      if (!this.ketcher) {
        this.initKetcher();
      }
      let res = await this.ketcher.generateImage(name, {
        outputFormat: "png"
        // backgroundColor: '#fff',
        // bondThickness: 1,
      });
      return URL.createObjectURL(res);
    },
    // mols（SMILES）
    async recognizeMoleculeMols(smile) {
      let res = await this.ketcher.generateImage(smile, {
        outputFormat: "png"
        // backgroundColor: '#fff',
        // bondThickness: 1,
      });
      this.molsPic.push(URL.createObjectURL(res));
    },
    chartWrapperDom() {
      if (echarts && this.$refs.myEchart) {
        return echarts.init(this.$refs.myEchart);
      }
      return null;
    },
    chartResize() {
      this.$nextTick(() => {
        if (this.chartWrapperDom()) {
          this.chartWrapperDom().resize();
        }
      });
    },
    async getItemsData() {
      this.smileInputDisable = false;
      let data = {
        smiles: {
          name: "smiles",
          value: this.smiles
        },
        strategy: {
          name: "strategy",
          value: this.value
        },
        ip: {
          name: "ip",
          value: "0.0.0.0"
        }
      };
      getItems(data).then(res => {
        console.log("res", res);
        if (res.data) {
          this.testdata = res.data;
          this.status = res.data.status;
          let mols = res.data.node.mols;
          let all_score = res.data.all_score;
          this.legends = res.data.node.legends;
          this.tableData = [
            {
              name: "state score",
              value: all_score["state score"]
            },
            {
              name: "number of reactions",
              value: all_score["number of reactions"]
            },
            {
              name: "number of pre-cursors",
              value: all_score["number of pre-cursors"]
            },
            {
              name: "number of pre-cursors in stock",
              value: all_score["number of pre-cursors in stock"]
            },
            {
              name: "average template occurrence",
              value: all_score["average template occurrence"]
            }
          ];
          for (let i = 0; i < mols.length; i++) {
            this.recognizeMoleculeMols(mols[i]);
          }
          this.smileInputDisable = true;
          this.$nextTick(() => {
            setTimeout(() => {
              this.initEcharts();
            }, 1500);
          });
        }
      });
    },
    traverseAndCallApi(data) {
      // 遍历每个对象
      data.forEach(async item => {
        // 如果有 children, 拼接子节点的 name 成 reactants
        if (item.children && item.children.length > 0) {
          const reactants = item.children.map(child => child.name).join(",");
          // 调用接口
          // callApi(item.name, reactants);
          // console.log("item.name", item.name);
          let requestData = {
            target: `${item.name}`,
            reactants: `${reactants}`,
            use_stream: false
          };
          // console.log("item", reactants);
          let res = await get_synthesis_steps(requestData);
          this.detailData.push(res.data);
          // let formatData = await this.processTreeData(res.data)
          // this.detailData.push(formatData)
          // 递归调用子节点
          // console.log(item.children)
          this.traverseAndCallApi(item.children);
        }
      });
    },
// // 处理返回的数据
// formatData(data) {
//   // 提取需要的字段
//   let doi = data.doi;
//   let pages = data.pages;
//   let conditions = data['conditions and steps'];1
//   // 格式化 reactants
//   let reactants = conditions.reactants.replace(/\\u2082/g, '2'); // 处理 Unicode 字符

//   // 构造格式化后的对象
//   return {
//     doi: doi,
//     pages: pages,
//     reactants: reactants,
//     solvents: conditions.solvents,
//     reactions: conditions.reactions,
//     experiments: conditions.experiments
//   };
// },
  async processTreeData(data) {
      let _that = this;
      let acc = []; // 初始化累加器

      for (let item of data) {
        // 如果当前节点不包含 '>>'，直接添加到结果中
        if (!item.smiles.includes(">>")) {
          // 截取 smiles 中 '>>' 前的部分作为 name
          let name = item.smiles.split(">>")[0];

          // 递归处理 children（如果有的话）
          let children = item.children
            ? await this.processTreeData(item.children)
            : [];
          let res = await _that.recognizeMolecule(name);
          acc.push({
            name: name, // 使用截取的部分作为 name
            // value: item.is_chemical || item.is_reaction ? 1 : 0,  // 可选：根据化学或反应节点决定值
            value: res, // 可选：根据化学或反应节点决定值
            imageUrl: res, // 获取图片URL（假设是异步操作）
            children: children // 递归处理子节点
          });
        } else {
          // 如果当前节点包含 '>>'，只保留它的子节点
          if (item.children && item.children.length > 0) {
            // 递归处理子节点并添加到结果中
            acc = acc.concat(await this.processTreeData(item.children));
          }
        }
      }

      return acc; // 返回最终的结果
    },
    async initEcharts() {
      if (!this.ketcher) {
        setTimeout(() => {
          this.initKetcher();
          this.initEcharts();
        }, 200);
        return;
      }
      let that = this;
      this.transformedData = await this.processTreeData([
        JSON.parse(this.testdata.jsons)
      ]);
      this.detailData = [];
      this.traverseAndCallApi(this.transformedData);
      var container = document.getElementById("myTreeEchart");
      let myChart = echarts.init(this.$refs.myTreeEchart); // 这里是为了获得容器所在位置
      myChart.setOption({
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          formatter: function(params) {
            console.log("params", params);
            return params.data.name; // Show the name on hover
          }
        },
        series: [
          {
            type: "tree",
            data: [this.transformedData[0]],
            top: "1%",
            left: "15%",
            bottom: "1%",
            right: "7%",
            // symbolSize: 150,
            symbolOffset: ["-50%", 0],
            orient: "RL",
            edgeShape: "polyline",
            symbolSize: [160, 80], // 设置图片大小
            force: {
              // 设置力引导的配置
              repulsion: 400, // 设置节点之间的排斥力
              edgeLength: 100, // 设置连接线的长度（也会影响节点之间的间距）
              layoutAnimation: true // 启用布局动画
            },
            label: {
              show: false // 关闭节点标签显示
            },
            leaves: {
              label: {
                show: false
              }
            },
            emphasis: {
              focus: "descendant"
            },
            symbol: function(params) {
              return "image://" + params; // Use the image URL as the symbol
            },
            expandAndCollapse: true, // 启用节点展开和收缩
            initialTreeDepth: -1, // 展开所有层级
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      });

      var allNode = 0;
      var nodes = myChart._chartsViews[0]._data._graphicEls;
      for (var i = 0, count = nodes.length; i < count; i++) {
        var node = nodes[i];
        if (node === undefined) continue;
        allNode++;
      }
      var height = window.innerHeight;
      var currentHeight = 35 * allNode;
      var newWidth = Math.max(currentHeight, height);
      container.style.width = window.innerWidth + "px";
      container.style.height = newWidth + "px";
      myChart.resize();
    }
  }
};
</script>

<style lang="less">
.echarts {
  width: 100%;
  height: 100%;
}
.container {
  display: flex;
  justify-content: center;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.scrollable-row {
  overflow-x: auto; /* 开启横向滚动 */
  -webkit-overflow-scrolling: touch; /* 提升在触控设备上的滑动效果 */
}
.col-content {
  display: inline-block; /* 确保内容在一行内显示 */
  white-space: nowrap; /* 禁止内容换行 */
}
//
// .text {
//     font-size: 14px;
//   }

//   .item {
//     margin-bottom: 18px;
//   }

//   .clearfix:before,
//   .clearfix:after {
//     display: table;
//     content: "";
//   }
//   .clearfix:after {
//     clear: both
//   }

//   .box-card {
//     width: 480px;
//   }


</style>
