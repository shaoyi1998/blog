<template>
    <div class="foot" :style="{ 'background': 'linear-gradient(45deg, #e4efe9,' + (foot_color || '#40e7bc') + ')' }">
        <el-row>
            <el-col :xs="0" :sm="0" :md="24" :lg="24" :xl="24">
                <h5>日月为易 执一而始 莫一而终 Copyright (C) 2018-{{now_year}} All Rights Reserved.</h5>
                <h5><el-image  src="beian.png" alt="图标"/>
                    &nbsp;<a :href="icp_url||''">{{icp_text||"icp备案"}}</a>
                    &nbsp;<a :href="psr_url||''">{{psr_text||"公安备案号"}}</a>
                    &nbsp;图片来源摄图网</h5>
            </el-col>
            <el-col :xs="24" :sm="24" :md="0" :lg="0" :xl="0">
                <h5>日月为易 执一而始 莫一而终 Copyright (C) 2018-{{now_year}} All Rights Reserved.</h5>
                <h5><el-image  src="beian.png" alt="图标"/><a :href="icp_url||''">{{icp_text||"icp备案"}}</a></h5>
                <h5><el-image  src="beian.png" alt="图标"/><a :href="psr_url||''">{{psr_text||"公安备案号"}}</a></h5>
                <h5>图片来源摄图网</h5>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
const date = new Date()
const now_year = date.getFullYear()
const props = defineProps(
    {
        icp_url: String,
        icp_text: String,
        psr_text:String,
        psr_url:String,
        foot_color:String
    })
</script>

<style scoped>
.foot {
    padding: 20px;
    text-align: center;
    justify-content: center;
    /*background: linear-gradient(45deg, #e4efe9, #f9d4ce); !* 设置渐变色 *! !* 设置背景颜色 *!*/
    border-radius: 20px; /* 设置圆角大小 */
}

.foot h5:hover {
    transform: rotateY(360deg);
    transition: transform 0.5s;
}

h5 {
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

el-image {
    margin-right: 10px; /* 调整图片和文字之间的距离 */
    margin-bottom: -3px; /* 调整图片的垂直对齐 */
}

</style>