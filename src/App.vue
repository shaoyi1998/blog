<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import MyHead from "./components/MyHead.vue"
import MyFoot from "./components/MyFoot.vue"

const icp_text = "湘ICP备18015634号-2"
const icp_url = "https://beian.miit.gov.cn/#/Integrated/index"
const psr_text = "湘公网安备 43130202000220号"
const psr_url = "https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43130202000220"
//页头图片
const head_img = "title.jpg"
//页尾渐变色
const foot_color = "rgb(25,234,234)"

</script>

<template>
    <div class="resume" :style="{ 'background-image': 'url(title.jpg)' }">
        <el-container class="container">
            <el-header>
                <MyHead :head_img="head_img" style="color:#ffffff"/>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
            <el-footer>
                <MyFoot :icp_text="icp_text" :icp_url="icp_url" :foot_color="foot_color" :psr_text="psr_text"
                        :psr_url="psr_url"/>
            </el-footer>
        </el-container>
    </div>
</template>

<style scoped>
.resume {
    margin: 0 auto;
    padding: 20px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    animation-name: slide;
    animation-duration: 10s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;

}

.container {
    transform-style: preserve-3d;
    animation: book-open 1s ease-in-out forwards;
}

</style>
