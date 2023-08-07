<script setup lang="js">
import {defineAsyncComponent, shallowRef, ref} from "vue";
import { Flag, CloseBold, HomeFilled,Tools,Document} from '@element-plus/icons'
import Cookies from "js-cookie"
import {useRouter} from "vue-router";


const ArticleShow = defineAsyncComponent(()=> import("./article/Show.vue"))
const ArticleAdd = defineAsyncComponent(()=> import("./article/Add.vue"))
const CategoryShow = defineAsyncComponent(()=> import("./category/Show.vue"))
const CategoryAdd = defineAsyncComponent(()=> import("./category/Add.vue"))
const Setting = defineAsyncComponent(()=>import("./article/Setting.vue"))
const router = useRouter();
let page= shallowRef(ArticleShow);

function go_homepage(){
    router.push('/');
}

function quit_system() {
    Cookies.remove("token")
    Cookies.remove("id")
    Cookies.remove("username")
    Cookies.remove("check_code")
    location.href = "./login"
}

</script>

<template>
    <el-container class="el-container">
        <el-menu>
            <el-menu-item index="0" @click="go_homepage">
                <el-icon>
                    <HomeFilled/>
                </el-icon>
                <template #title>
                    <span>首页</span>
                </template>
            </el-menu-item>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><Document /></el-icon>
                    <span>文章</span>
                </template>
                <el-menu-item-group>
                    <template #title>文章管理</template>
                    <el-menu-item index="1-1" @click="page = ArticleShow;">
                        <span>所有文章</span>
                    </el-menu-item>
                    <el-menu-item index="1-2" @click="page = ArticleAdd;">
                        <span>新增文章</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon><Flag /></el-icon>
                    <span>类别</span>
                </template>
                <el-menu-item-group>
                    <template #title>类别</template>
                    <el-menu-item index="2-1" @click="page= CategoryShow;">
                        <span>所有类别</span>
                    </el-menu-item>
                    <el-menu-item index="2-2" @click="page = CategoryAdd;">
                        <span>类别新增</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="3" @click="page= Setting;">
                <el-icon><Tools /></el-icon>
                <template #title>
                    <span>设置</span>
                </template>
            </el-menu-item>
            <el-menu-item index="4" @click="quit_system">
                <el-icon>
                    <CloseBold/>
                </el-icon>
                <template #title>
                    <span>退出登录</span>
                </template>
            </el-menu-item>
        </el-menu>
        <el-main class="el-main">
            <component :is="page" ></component>
        </el-main>
    </el-container>
</template>

<style>


.title_text strong {
    padding: 0.2em;
    font-size: 4em;
    left: 0;
}

.title_img img {
    max-height: 6em;
    min-width: 6em;
    padding: 0.2em;
    border-radius: 20%;
}

.el-container{
    background: rgba(255, 255, 255, 0.5);
}

</style>
