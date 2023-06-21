<template>
    <div class="title_background" :style="{ 'background-image':  'url(' + head_img + ')' }">
        <el-row>
            <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
                <h2>
                    日月为易
                </h2>
            </el-col>
        </el-row>
        <el-row>
            <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
                <h3>
                    "真性有为空 缘生故如幻"
                </h3>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="js">
const props = defineProps(
    {
        head_img :String
    })
</script>

<style scoped>
.title_background {
    margin-top: 2px;
    padding:10px 20px 0; /* 添加一些内边距，以便内容不会太靠近边缘 */
    border-radius: 10px; /* 设置圆角大小 */
    background-attachment: scroll;
    background-size: cover;
}

.title_background h2:hover {
    animation: rainbow 1s ease-in-out;
}

.title_background h3:hover {
    animation: rainbow 1s ease-in-out;
}

@keyframes rainbow {
    0% {
        color: red;
    }
    25% {
        color: yellow;
    }
    50% {
        color: green;
    }
    75% {
        color: blue;
    }
    100% {
        color: red;
    }
}

.title_background h2:active {
    transform: rotate(360deg);
}

.title_background h3:active {
    transform: rotate(360deg);
}

</style>