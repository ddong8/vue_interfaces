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
                <div v-for="(item, index) in molsPic" :key="index"
                    style="margin-right: 30px;border-right: 1px solid #ccc;">
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
    name: 'MoleculeIndex',
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
        async getItems() {
            // let data =
            // {
            //   smiles: {
            //     name: "smiles",
            //     value: "Cc1cccc(c1N(CC(=O)Nc2ccc(cc2)c3ncon3)C(=O)C4CCS(=O)(=O)CC4)C"
            //   },
            //   strategy: {
            //     name: "strategy",
            //     value: "2"
            //   }
            // }
            // let res = await getItems(data)
            // let mols = res.data.node.mols
            let mols = [
                "O=C(O)C1CCS(=O)(=O)CC1",
                "Cc1cccc(C)c1N",
                "O=C(CCl)Nc1ccc(-c2ncon2)cc1",
            ]
            for (let i = 0; i < mols.length; i++) {
                this.recognizeMoleculeMols(mols[i])
            }
            console.log('hjh', res);
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