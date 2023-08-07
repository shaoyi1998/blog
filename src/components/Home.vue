<template>
    <el-menu mode="horizontal"
             @select="menu_select"
             class="el-menu"
    >
        <el-menu-item index="首页">首页</el-menu-item>
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
    <el-row>
        <el-col :xs="0" :sm="1" :md="3" :lg="3" :xl="4"></el-col>
        <el-col :xs="24" :sm="22" :md="18" :lg="18" :xl="16" class="row-text" v-if="is_open">
            <el-card class="box-card" v-for="article in article_summary_data">
                <template #header>
                    <div class="card-header">
                        <b @click="open_article(article.id)">{{ article.title }}</b>
                    </div>
                </template>
                <div class="card-content">
                    <div class="my_span">
                        <svg-icon type="mdi" :path="icon.author"/>
                        <i>邵易</i>
                    </div>
                    <div class="my_span">
                        <svg-icon type="mdi" :path="icon.type"/>
                        <i>{{ article.type_name }}</i>
                    </div>
                    <div class="my_span">
                        <svg-icon type="mdi" :path="icon.time"/>
                        <i>{{ formatReleaseDate(article.release_date) }}</i>
                    </div>
                </div>
                <div class="card_summary">
                    <svg-icon type="mdi" :path="icon.content_summary"/>
                    <i>{{ article.content_summary }}</i>
                </div>
            </el-card>
            <el-row class="row-text" style="justify-content:center;">
                <el-pagination background layout="prev, pager, next"
                               :total="total_article_pages"
                               v-model:current-page="current_page"
                               @current-change="get_article_summary_data()"
                               :default-page-size="10"/>
            </el-row>
        </el-col>
        <el-col :xs="24" :sm="22" :md="18" :lg="18" :xl="16" class="row-text" v-else>
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <b>{{ article_data.title }}</b>
                    </div>
                </template>
                <div class="card-content">
                    <div class="my_span">
                        <svg-icon type="mdi" :path="icon.author"/>
                        <i>邵易</i>
                    </div>
                    <div class="my_span">
                        <svg-icon type="mdi" :path="icon.type"/>
                        <i>{{ article_data.type }}</i>
                    </div>
                    <div class="my_span">
                        <svg-icon type="mdi" :path="icon.time"/>
                        <i>{{ formatReleaseDate(article_data.release_date) }}</i>
                        <svg-icon type="mdi" path="icon.mdi"></svg-icon>
                    </div>
                </div>
            </el-card>
            <div id="content" v-html="article_data.content" class="article-content"></div>
        </el-col>
        <el-col :xs="0" :sm="1" :md="3" :lg="3" :xl="4"></el-col>
    </el-row>

</template>

<script setup>
//文章页数
import {onMounted, ref} from "vue";
import {MyRequestMixin} from "../units/my_requests.js";
import {article_summary_url, article_url, category_summary_url} from "../units/my_global_url.js";
import {convertToChildrenFormat} from "../units/my_category_handle.js";
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiAccount, mdiClockTimeFiveOutline, mdiEye, mdiFormatListBulletedType} from "@mdi/js";
import Prism from 'prismjs';
import "prismjs/components/prism-python"
import 'prismjs/themes/prism.css';

const total_article_pages = ref(30)
const article_summary_data = ref([])
const article = ref()
const article_data = ref()
let category_data = ref([])
const current_page = ref(1)
const is_open = ref(true)


//定义图标
const icon = {
    "time": mdiClockTimeFiveOutline,
    "author": mdiAccount,
    "type": mdiFormatListBulletedType,
    "content_summary": mdiEye,

}

onMounted(
    async () => {
        await get_category_data()
        await get_article_summary_data()
        Prism.highlightAll()
    }
)

async function get_article_summary_data() {
    const data = (await MyRequestMixin.get_data(article_summary_url + "?page=" + current_page.value)).data
    article_summary_data.value = data.results
    total_article_pages.value = data.count
}

async function get_category_data() {
    category_data.value = convertToChildrenFormat((await MyRequestMixin.get_data(category_summary_url)).data)
    console.log("分类数据", category_data.value)
}

async function menu_select(key, keyPath) {
    is_open.value = true
    if (key === "首页") {
        get_article_summary_data()
    } else {
        const data = (await MyRequestMixin.get_data(article_summary_url + "?page=" + current_page.value + "&type=" + key)).data
        article_summary_data.value = data.results
        total_article_pages.value = data.count
    }
}

async function open_article(id) {
    is_open.value = false
    article_data.value = (await MyRequestMixin.get_data(article_url + id)).data
    console.log("文章数据", article_data.value)
    extractCode(article_data)
}


function formatReleaseDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}


function extractCode(data) {
    const contentContainerHTML = data.value.content;
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentContainerHTML, 'text/html');

    const preElements = doc.querySelectorAll('pre code');
    const codeContents = [];

    preElements.forEach(codeElement => {
        // Assuming x is the processing function
        codeElement.innerHTML = Prism.highlight(codeElement.innerHTML, Prism.languages.python, "language-python");
    });
    data.value.content = doc.body.innerHTML
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
    align-items: center;
    width: 100%;
    background-color: rgba(196, 255, 249, 0.6);
    padding: 1rem;
    margin: 1rem auto 1rem;
    background-size: 110% 110%;
    background-position: center;
    border-radius: 1rem;
}

.row-text el-image {
    width: 100%;
    max-height: 10rem;
}

.row-text .col-text {
    width: 50%;
    font-size: 1.2rem;
    line-height: 1.5;
    color: #333;
    text-align: justify;
    background: rgba(140, 129, 55, 0.25)
}

.box-card {
    border: 0.1rem solid #ccc;
    border-radius: 1rem;
    padding: 1rem;
    background-color: #DAFFEF;
    margin-bottom: 1rem;
}

.card-header {
    background-color: #a3f5b9;
    padding: 1rem;
    border-radius: 1rem 1rem 0 0;
    font-size: 1.5rem;
}

.card-content {
    padding: 1.2rem;
    background-color: #6ceed5;
    border-radius: 1rem 1rem 0 0;
}

.card_summary {
    padding: 15px;
    background-color: #88e4e7;
    border-radius: 0 0 1rem 1rem;
}

.my_span {
    display: flex;
    align-items: center;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
}


.my_span i {
    margin-left: 5px;
    font-style: italic;
}

.article-content {
    padding: 1rem 1rem 1rem 2rem;
    font-size: calc(30% + 0.8rem);
    background-color: #a6e3ee;
    border-radius: 8px 8px 0 0;
}

code {

    font-size: 1rem;
}


</style>