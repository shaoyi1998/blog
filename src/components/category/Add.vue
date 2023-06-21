<template>
    <el-form
        ref = "category_form"
        status-icon
        label-width="auto"
        label-position="top"
        size="default"
        :model="category_form_data"
    >
        <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '需要填写分类名称', trigger: 'blur', }]">
            <el-input v-model="category_form_data.name"/>
        </el-form-item>
        <el-form-item label="父类(一级目录可不填)" prop="parent">
            <el-cascader
                v-model="category_form_data.parent"
                :options="category_data"
                :show-all-levels="false"
                clearable
                :props=" {checkStrictly: true,}"
            />
        </el-form-item>
        <el-form-item>
            <div class="button">
                <el-button type="primary" @click="submit()" style="text-align: center">保存</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script setup>
import {MyRequestMixin} from "../../units/my_requests.js";
import {category_summary_url, category_url} from "../../units/my_global_url.js";
import {onMounted, reactive, ref} from "vue";
import {MyTipsMixin} from "../../units/my_tips.js";
import {convertToChildrenFormat} from "../../units/my_category_handle.js"
import {form_validate} from "../../units/my_form_validate.js";


onMounted(
    async () => {
        await get_category_data()
    }
)

const category_form = ref()
const category_form_data = reactive(
    {
        name: "",
        parent: ""
    }
)
let category_data = ref([])

function submit(){
    form_validate(category_form.value,post_category_data)
}


async function get_category_data() {
    category_data.value = convertToChildrenFormat((await MyRequestMixin.get_data(category_summary_url)).data)
    console.log("分类数据", category_data)
}

async function post_category_data() {
    const result = await MyRequestMixin.post_data(category_url, category_form_data);
    if (result.error) {
        MyTipsMixin.error_tip(result.error)
    } else {
        MyTipsMixin.success_tip("提交成功")
        await get_category_data()
    }
}
</script>

<style scoped>

</style>