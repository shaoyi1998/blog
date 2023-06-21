<template>
    <el-table :data="category_data" size="large" style="width: 100%">
        <el-table-column prop="name" label="类别" fixed='left' resizable min-width="100px"/>
        <el-table-column prop="parent_name" label="父类" resizable min-width="100px"/>
        <el-table-column resizable label="操作" min-width="120px">
            <template #default="scope">
                <el-button size="small"
                >编辑
                </el-button
                >
                <el-button
                    size="small"
                    type="danger"
                    @click="MyTipsMixin.confirm_delete(scope.row.id,delete_category_url)"
                >删除
                </el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        v-model:current-page="current_page"
        @current-change="get_category_data()"
        :total="category_count">
    </el-pagination>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {MyRequestMixin} from "../../units/my_requests.js";
import {category_url} from "../../units/my_global_url.js";
import {MyTipsMixin} from "../../units/my_tips.js";

onMounted(
    async () => {
        await get_category_data()
    }
)
const category_data = ref()
const current_page = ref(1)
const category_count = ref(0)

async function get_category_data() {
    const data = (await MyRequestMixin.get_data(category_url+"?page="+current_page.value)).data
    category_data.value = data.results
    category_count.value = data.count
    console.log("分类数据", category_data.value,category_count.value)
}

async function delete_category_url(id){
    const result = await MyRequestMixin.delete_data(category_url + id)
    console.log("结果",result)
    if (result.error){
        MyTipsMixin.error_tip(result.error)
    } else {
        MyTipsMixin.success_tip("删除成功")
        await get_category_data()
    }
}

</script>

<style scoped>

</style>