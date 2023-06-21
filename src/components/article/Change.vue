<template>
    <el-form
        ref="article_form"
        :model="article_data_form"
        label-width="auto"
        label-position="top"
        size="default"
        status-icon
    >
        <h1>新增人员</h1>
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
            <div class="button">
                <el-button @click="$emit('is_editing_change',true)" style="text-align: center">返回</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script setup>
import MyTinymce from "../MyTinymce.vue"
import {onMounted, ref} from "vue";
import {convertToChildrenFormat,getParents} from "../../units/my_category_handle.js";
import {MyRequestMixin} from "../../units/my_requests.js";
import { article_url, category_summary_url} from "../../units/my_global_url.js";
import {form_validate} from "../../units/my_form_validate.js";
import {MyTipsMixin} from "../../units/my_tips.js";

onMounted(async () => {
    await get_category_data()
    await get_article_data()
})
let category_data = ref([])
let raw_category_data = []
async function get_category_data() {
    raw_category_data = (await MyRequestMixin.get_data(category_summary_url)).data
    category_data.value = convertToChildrenFormat(raw_category_data)
    console.log("分类数据", category_data)
}
async function get_article_data() {
    article_data_form.value = (await MyRequestMixin.get_data(article_url+props.id)).data
    article_data_form.value.type =  getParents(raw_category_data,article_data_form.value.type)
    console.log("文章数据", article_data_form.value)
}
async function put_article_data() {
    const result = (await MyRequestMixin.put_data(article_url+props.id,article_data_form.value)).data
    if (result.error) {
        MyTipsMixin.error_tip(result.error)
    } else {
        MyTipsMixin.success_tip("提交成功")
    }
}
function submit(){
    form_validate(article_form.value,put_article_data())
}



const props = defineProps(['id',"is_editing"])
const article_form = ref();
const article_data_form = ref({
    title: "",
    author: "",
    content: "",
    type: "",
    release_date: ""
});

</script>

<style scoped>

</style>