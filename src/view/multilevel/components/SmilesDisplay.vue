<template>
  <div class="molecule">
    <div v-show="show">
      <!-- 显示生成的图像 -->
      <div v-if="imageUrl">
        <h3>生成的图像:</h3>
        <img :src="imageUrl" alt="化学结构图像" />
      </div>
      <button @click="recognizeMolecule">识别图片</button>
      <button @click="getItems">生成mols图片</button>
      <div style="display: flex;">
        <div v-for="(item, index) in molsPic" :key="index" style="margin-right: 30px;border-right: 1px solid #ccc;">
          <img :src="item" alt="化学结构图像" />
        </div>
      </div>
      <p>
        <Input class="input-search" v-model="smiles" placeholder="input smiles text" size="large">
        <Button slot="append" @click="onSearch">搜索</Button>
        </Input>
      </p>
      <div class="flex">
        <div class="left_content">
          <!-- <a-tabs :type="'card'" v-model="activeKey" @change="changeTab">
            <a-tab-pane key="ketcher" tab="Ketcher" />
            <a-tab-pane key="jsme" tab="JSME" />
          </a-tabs> -->
          <iframe class="frame" id="idKetcher" src="./standalone/index.html" width="800" height="600"
            v-show="activeKey === 'ketcher'" />
          <!-- <JSME height="600px" width="800px" options="oldlook,star,atommovebutton,hydrogens" :model-value="jsmeSmiles"
            :onChange="changeSmiles" v-show="activeKey === 'jsme'" /> -->
        </div>
        <div class="right_content">
          <!-- <h2>搜索条件</h2>
          <a-radio-group class="radio-group" v-model="searchKey">
            <a-radio :value="1">子结构搜索</a-radio>
            <a-radio :value="2">精确搜索</a-radio>
            <a-radio :value="3">90%相似搜索</a-radio>
            <a-radio :value="4">60%相似搜索</a-radio>
            <a-radio :value="5">30%相似搜索</a-radio>
          </a-radio-group> -->

          <Divider />
          <p>
            <i-button @click="getSmiles" type="primary" icon="search"> Get SMILES </i-button>
          </p>
          <p style="font-size: 14px">{{ activeKey === 'ketcher' ? ketcherSmiles : jsmeSmiles }}</p>
        </div>
      </div>
    </div>
    <!-- <SeeAdsComponent ref="seeAdsComponentRef" v-if="!show" @confirmOk="confirmOk"/> -->

  </div>
</template>

<script>
import { Divider } from 'iview';
import { getItems } from '@/api/moleculeIndex'
// import JSME from './JSME'
// import { Modal } from 'ant-design-vue'
// import SeeAdsComponent from "@/components/SeeAdsComponent.vue";

export default {
  name: 'SmilesDisplay',
  components: {
    // JSME,
    // SeeAdsComponent
  },
  data() {
    return {
      show: true,
      searchKey: 1,
      activeKey: 'ketcher',
      year: 2021,
      ketcher: null,
      ketcherSmiles: null,
      jsmeSmiles: null,
      currentSmiles: null,
      smiles: null,
      imageData: null, // 上传的图片数据
      imageUrl: null,      // 用于存储生成图像的 URL
      molsPic: [],
      resTest: {
        "index": 0,
        "status": "Solved",
        "all_score": {
          "state score": 0.994039853898894,
          "number of reactions": 2,
          "number of pre-cursors": 3,
          "number of pre-cursors in stock": 3,
          "average template occurrence": 0
        },
        "jsons": `{
    "type": "mol",
    "hide": false,
    "smiles": "Cc1cccc(C)c1N(CC(=O)Nc1ccc(-c2ncon2)cc1)C(=O)C1CCS(=O)(=O)CC1",
    "is_chemical": true,
    "in_stock": false,
    "children": [
      {
        "type": "reaction",
        "hide": false,
        "smiles": "Cc1cccc(C)c1N(CC(=O)Nc1ccc(-c2ncon2)cc1)C(=O)C1CCS(=O)(=O)CC1>>Cc1cccc(C)c1NCC(=O)Nc1ccc(-c2ncon2)cc1.O=C(O)C1CCS(=O)(=O)CC1",
        "is_reaction": true,
        "metadata": {
          "policy_probability": 0.25246631069973563,
          "policy_probability_rank": 0,
          "policy_name": "editretro",
          "mapped_reaction_smiles": "[CH3:1][c:2]1[cH:3][cH:4][cH:5][c:6]([CH3:7])[c:8]1[N:9]([CH2:10][C:11](=[O:12])[NH:13][c:14]1[cH:15][cH:16][c:17](-[c:18]2[n:19][cH:20][o:21][n:22]2)[cH:23][cH:24]1)[C:25](=[O:26])[CH:27]1[CH2:28][CH2:29][S:30](=[O:31])(=[O:32])[CH2:33][CH2:34]1>>[CH3:35][c:36]1[cH:37][cH:38][cH:39][c:40]([CH3:41])[c:42]1[NH:43][CH2:44][C:45](=[O:46])[NH:47][c:48]1[cH:49][cH:50][c:51](-[c:52]2[n:53][cH:54][o:55][n:56]2)[cH:57][cH:58]1.[O:59]=[C:60]([OH:61])[CH:62]1[CH2:63][CH2:64][S:65](=[O:66])(=[O:67])[CH2:68][CH2:69]1"
        },
        "children": [
          {
            "type": "mol",
            "hide": false,
            "smiles": "O=C(O)C1CCS(=O)(=O)CC1",
            "is_chemical": true,
            "in_stock": true
          },
          {
            "type": "mol",
            "hide": false,
            "smiles": "Cc1cccc(C)c1NCC(=O)Nc1ccc(-c2ncon2)cc1",
            "is_chemical": true,
            "in_stock": false,
            "children": [
              {
                "type": "reaction",
                "hide": false,
                "smiles": "Cc1cccc(C)c1NCC(=O)Nc1ccc(-c2ncon2)cc1>>Cc1cccc(C)c1N.O=C(CCl)Nc1ccc(-c2ncon2)cc1",
                "is_reaction": true,
                "metadata": {
                  "policy_probability": 0.6772378667525225,
                  "policy_probability_rank": 0,
                  "policy_name": "editretro",
                  "mapped_reaction_smiles": "[CH3:35][c:36]1[cH:37][cH:38][cH:39][c:40]([CH3:41])[c:42]1[NH:43][CH2:44][C:45](=[O:46])[NH:47][c:48]1[cH:49][cH:50][c:51](-[c:52]2[n:53][cH:54][o:55][n:56]2)[cH:57][cH:58]1>>[CH3:1][c:2]1[cH:3][cH:4][cH:5][c:6]([CH3:7])[c:8]1[NH2:9].[O:10]=[C:11]([CH2:12][Cl:13])[NH:14][c:15]1[cH:16][cH:17][c:18](-[c:19]2[n:20][cH:21][o:22][n:23]2)[cH:24][cH:25]1"
                },
                "children": [
                  {
                    "type": "mol",
                    "hide": false,
                    "smiles": "Cc1cccc(C)c1N",
                    "is_chemical": true,
                    "in_stock": true
                  },
                  {
                    "type": "mol",
                    "hide": false,
                    "smiles": "O=C(CCl)Nc1ccc(-c2ncon2)cc1",
                    "is_chemical": true,
                    "in_stock": true
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
        }`,
        "node": {
          "legends": ["zinc", "zinc", "zinc"],
          "mols": ["O=C(O)C1CCS(=O)(=O)CC1", "Cc1cccc(C)c1N", "O=C(CCl)Nc1ccc(-c2ncon2)cc1"],
          "ncolumns": 6
        }
      }
    }
  },
  methods: {
    // confirmOk(res) {
    //   this.show = res
    // },

    // 处理上传的图片
    async handleFileUpload(event) {
      const file = event.target.files[0]; // 获取文件
      if (file) {
        const imageBlob = new Blob([file], { type: file.type }); // 创建Blob对象
        try {
          // 使用 Blob 调用 recognize 方法
          const result = await this.ketcher.recognize(imageBlob);
          console.log('识别结果:', result);
        } catch (error) {
          console.error('识别时出错:', error);
        }
      }
    },

    // 提交识别结果（SMILES）
    async recognizeMolecule() {
      let res = await this.ketcher.generateImage('O=C(CCl)Nc1ccc(-c2ncon2)cc1', {
        outputFormat: 'png',
        // backgroundColor: '#fff',
        // bondThickness: 1,
      })
      this.imageUrl = URL.createObjectURL(res);
      console.log(res);
    },
    // 结果（SMILES）
    async recognizeMoleculeMols(smiles) {
      let res = await this.ketcher.generateImage(smiles, {
        outputFormat: 'png',
        // backgroundColor: '#fff',
        // bondThickness: 1,
      })
      this.molsPic.push(URL.createObjectURL(res));
      console.log(this.molsPic);
    },
    onSearch() {
      console.log('hjh');
      this.$nextTick(() => {
        this.initKetcher()
        this.ketcher.setMolecule(this.smiles)
        this.jsmeSmiles = this.smiles
      })
    },
    changeSmiles(val) {
      this.currentSmiles = val
    },
    getYear() {
      this.year = new Date().getFullYear()
    },
    getSmiles() {
      if (this.activeKey === 'ketcher') {
        if (!this.ketcher) {
          this.initKetcher()
        }
        this.ketcher
          .getSmiles()
          .then(res => {
            this.ketcherSmiles = res
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        this.jsmeSmiles = this.currentSmiles
      }
    },
    convertToEChartsTreeFormat(data) {
      // Base structure for each node in ECharts tree
      function processNode(node) {
        // Creating the node with 'name' from smiles and any necessary styling
        const processedNode = {
          name: node.smiles,  // The 'name' in ECharts tree corresponds to the 'smiles'
          itemStyle: {
            color: node.is_chemical ? '#5470C6' : '#18a849', // color based on is_chemical flag
            borderColor: node.is_chemical ? '#5470C6' : '#18a849'
          },
          // If there are children, recursively process them
          children: node.children ? node.children.map(processNode) : []
        };
        return processedNode;
      }

      // Start the recursion from the root
      return [{
        name: '根节点',
        url: '',  // Add any URL or additional properties for the root node
        itemStyle: {
          color: '#18a849',
          borderColor: '#18a849'
        },
        children: data ? data.map(processNode) : [] // Recursively process children
      }];
    },
    getItems() {
      let data =
      {
        smiles: {
          name: "smiles",
          value: "Cc1cccc(c1N(CC(=O)Nc2ccc(cc2)c3ncon3)C(=O)C4CCS(=O)(=O)CC4)C"
        },
        strategy: {
          name: "strategy",
          value: "0"
        },
        ip: {
          name: "ip",
          value: "0.0.0.0"
        }
      }
      getItems(data).then(res => {
        console.log('res.data.jsons', res.data);
        const echartsData = this.convertToEChartsTreeFormat([JSON.parse(res.data.jsons)]);
        console.log('hjh jsons', echartsData);

      })
    },
    changeTab() {
      this.currentSmiles = ''
      this.ketcherSmiles = ''
      this.jsmeSmiles = ''
    },
    initKetcher() {
      let ketcherFrame = document.getElementById('idKetcher')
      let ketcher = null
      if ('contentDocument' in ketcherFrame) {
        ketcher = ketcherFrame.contentWindow.ketcher
      } else {
        ketcher = document.frames['idKetcher'].window.ketcher
      }
      this.ketcher = ketcher
    },
    initresTest() {
      console.log('resTest', JSON.parse(this.resTest.jsons));
      console.log('resTest', this.resTest);

    }
  },
  created() {
    this.initresTest()
    this.getItems()
    this.getYear()
    this.$nextTick(() => {
      // this.$refs.seeAdsComponentRef.show()
      setTimeout(() => {
        this.initKetcher()
      }, 500)
    })
  }
}
</script>

<style scoped>
.molecule {
  padding: 30px;
}

.input-search {
  width: 800px;
}

.flex {
  display: flex;
}

.molecule .left_content {
  width: 800px;
}

.molecule .right_content {
  width: calc(100% - 800px);
  margin-left: 50px;
  margin-top: 50px;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.radio-group {
  display: grid;
}

.ant-radio-wrapper {
  padding: 10px 0 !important;
}
</style>