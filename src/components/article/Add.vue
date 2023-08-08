<template>
    <el-form
        ref="article_form"
        :model="article_data_form"
        label-width="auto"
        label-position="top"
        size="default"
        status-icon
    >
        <h1>新增文章</h1>
        <el-form-item label="题目" required prop="title" :rules="[{ required: true, message: '需要填写文章标题', trigger: 'blur', }]">
            <el-input v-model="article_data_form.title"/>
        </el-form-item>
        <el-form-item label="发布时间" required prop="release_date"
                      format="YYYY/MM/DD HH:mm:ss"
                      :rules="[{ required: true, message: '需要填写发布时间', trigger: 'blur', }]">
            <el-date-picker type="datetime" v-model="article_data_form.release_date"/>
        </el-form-item>
        <el-form-item label="分类" required prop="type" :rules="[{ required: true, message: '需要填写分类', trigger: 'blur', }]">
            <el-cascader
                v-model="article_data_form.type"
                :options="category_data"
                :show-all-levels="false"
                :props=" {checkStrictly: true,}"
                clearable
            />
        </el-form-item>
        <el-form-item label="内容" required prop="content" :rules="[{ required: true, message: '需要填写内容', trigger: 'blur', }]">
            <MyTinymce
                v-model="article_data_form.content"
                style="width: 100%"
            ></MyTinymce>
        </el-form-item>
        <el-form-item>
            <div class="button">
                <el-button type="primary" @click="submit()" style="text-align: center">保存</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script setup lang="js">
import {reactive, ref,onMounted,} from 'vue';
import Cookies from "js-cookie";
import MyTinymce from "../MyTinymce.vue"
import {convertToChildrenFormat} from "../../units/my_category_handle.js";
import {MyRequestMixin} from "../../units/my_requests.js";
import {article_root_url, category_summary_url,} from "../../units/my_global_url.js";
import {form_validate} from "../../units/my_form_validate.js";
import {MyTipsMixin} from "../../units/my_tips.js";
onMounted(
    async () => {
        await get_category_data()
    }
)
let category_data = ref([])

async function get_category_data() {
    category_data.value = convertToChildrenFormat((await MyRequestMixin.get_data(category_summary_url)).data)
}

const article_form = ref();
const article_data_form = reactive({
    title: "",
    author: "",
    content: "",
    type: "",
    release_date: ""
});

function submit(){
    form_validate(article_form.value,post_article_data)
}

async function post_article_data() {
    const result = await MyRequestMixin.post_data(article_root_url, article_data_form, Cookies.get("token"))
    if (result.error) {
        MyTipsMixin.error_tip(result.error)
    } else {
        MyTipsMixin.success_tip("提交成功")
    }
}


</script>


<style>

.button {
    display: flex;
    justify-content: center;
    width: 100%;
}

</style>