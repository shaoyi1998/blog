<template>
    <div v-if="is_editing">
        <el-scrollbar v-if="response_success">
            <el-table ref="table_ref" stripe border size="large" :data="article_summary_data"
                      @sort-change="">
                <el-table-column prop="title" fixed='left' label="标题" resizable min-width="100px"/>
                <el-table-column prop="type_name" label="类型" resizable min-width="100px"/>
                <el-table-column prop="release_date" label="发布日期" resizable min-width="100px"
                                 :formatter="formatReleaseDateTime"/>
                <el-table-column prop="modification_date" label="修改时间" resizable
                                 :formatter="formatModificationDateTime" min-width="100px"/>
                <el-table-column label="操作" align="center" min-width="160px">
                    <template #header>
                        <el-input size="small"
                                  placeholder="搜索内容(项目名,负责人名称)"
                                  @keydown.enter="" type="search"/>
                    </template>
                    <template #default="scope">
                        <el-button-group>
                            <el-button type="primary" :icon="Edit"
                                       @click="is_editing=false;id=scope.row.id">编辑
                            </el-button>
                            <el-button type="danger" :icon="Delete" @click="MyTipsMixin.confirm_delete(scope.row.id,delete_article_url)">
                                删除
                            </el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                v-model:current-page="current_page"
                @current-change="get_article_summary_data()"
                :total="article_count">
            </el-pagination>
        </el-scrollbar>
        <div v-else>
            后台数据获取失败,请联系管理员检查后台数据服务器是否正常,具体错误代码请F12检查浏览器输出控制台报错日志
        </div>
    </div>
    <div v-else>
        <!--@is_editing_change标识监控子组件的 is_editing_change事件       -->
        <Change :id="id" @is_editing_change="(n)=>is_editing =n"></Change>
    </div>
</template>

<script setup lang="js">
import {onMounted, ref} from "vue";
import {Delete, Edit} from '@element-plus/icons-vue'
import {ElButton, ElTable} from "element-plus";
import {MyRequestMixin} from "../../units/my_requests.js";
import {article_summary_root_url, article_root_url} from "../../units/my_global_url.js";
import {MyTipsMixin} from "../../units/my_tips.js";
import Change from "./Change.vue"

onMounted(
    async () => {
        await get_article_summary_data()
    }
)

const id = ref(0)
const is_editing = ref(true)
const response_success = ref(true)
const table_ref = ref()
const article_summary_data = ref()
const article_count = ref(0)
const current_page = ref(1)


async function get_article_summary_data() {
    const data = (await MyRequestMixin.get_data(article_summary_root_url+"?page="+current_page.value)).data
    article_summary_data.value = data.results
    article_count.value = data.count
    console.log("文章数据", article_summary_data.value, article_count.value)
}

async function delete_article_url(id) {
    const result = await MyRequestMixin.delete_data(article_root_url + id)
    console.log("结果", result)
    if (result.error) {
        MyTipsMixin.error_tip(result.error)
    } else {
        MyTipsMixin.success_tip("删除成功")
        await get_article_summary_data()
    }
}


function formatReleaseDateTime(row, column) {
    const date = new Date(row.release_date);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

function formatModificationDateTime(row, column) {
    const date = new Date(row.modification_date);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}
</script>

<style scoped>
</style>