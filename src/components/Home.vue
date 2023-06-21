<template>
    <el-menu mode="horizontal">
        <template v-for="menu in category_data">
            <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.value">
                <template #title>
                    <span>{{ menu.label }}</span>
                </template>
                <template v-for="child in menu.children">
                    <el-sub-menu v-if="child.children && child.children.length > 0" :index="child.value">
                        <template #title>
                            <span>{{ child.label }}</span>
                        </template>
                        <template v-for="grandchild in child.children">
                            <el-menu-item :index="grandchild.value">
                                <span>{{ grandchild.label }}</span>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                    <el-menu-item v-else :index="child.value">
                        <span>{{ child.label }}</span>
                    </el-menu-item>
                </template>
            </el-sub-menu>
            <el-menu-item v-else :index="menu.value">
                <span>{{ menu.label }}</span>
            </el-menu-item>
        </template>
    </el-menu>
    <el-row class="row-text" v-for="o in 5">
        <el-col :xs="0" :sm="0" :md="0" :lg="4" :xl="2" class="image-col">
            <el-avatar shape="square" :size="100" fit:true src="./title.jpg"/>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="22">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>文章标题{{ o }}😀</span>
                        <el-button class="button" text>作者</el-button>
                    </div>
                </template>
                文章内容
            </el-card>
        </el-col>
    </el-row>
    <el-row class="row-text" style="justify-content:center;">
        <el-pagination background layout="prev, pager, next"
                       :total="total_article_pages"
                       v-model:current-page="current_page"
                       @current-change="get_article_summary_data()"
                       :default-page-size="10" />
    </el-row>
</template>

<script setup>
//文章页数
import {onMounted, ref} from "vue";
import {MyRequestMixin} from "../units/my_requests.js";
import {article_summary_url, category_summary_url} from "../units/my_global_url.js";
import {convertToChildrenFormat} from "../units/my_category_handle.js";
const total_article_pages = ref(30)
const article_summary_data = ref()
const article = ref()
let category_data = ref([])
const current_page = ref(1)

onMounted(
    async () => {
        await get_category_data()
        await get_article_summary_data()
    }
)

async function get_article_summary_data() {
    const data = (await MyRequestMixin.get_data(article_summary_url+"?page="+current_page.value)).data
    article_summary_data.value = data.results
    total_article_pages.value = data.count
}

async function get_category_data() {
    category_data.value = convertToChildrenFormat((await MyRequestMixin.get_data(category_summary_url)).data)
    console.log("分类数据", category_data.value)
}
</script>

<style>

@keyframes book-open {
    0% {
        transform: rotateY(0deg);
    }
    50% {
        transform: rotateY(180deg);
    }
    100% {
        transform: rotateY(360deg);
    }
}

@keyframes slide {
    0% {
        background-position: 0 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}


.row-text {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 10px;
    margin: 20px auto 10px;
    background-size: 110% 110%;
    background-position: center;
}

.row-text el-image {
    width: 100%;
    max-height: 300px;
}

.row-text .col-text {
    width: 50%;
    padding: 20px;
    font-size: 1.2rem;
    line-height: 1.5;
    color: #333;
    text-align: justify;
    background: rgba(140, 129, 55, 0.25)
}


h4, p {
    color: white;
}


.image-col {
    display: flex;
    justify-content: center;
}

.el-menu{
    margin-top: 30px;
}


</style>