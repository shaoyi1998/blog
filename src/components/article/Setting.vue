<template>

    <el-form class="setting" size="default" label-width="auto" label-position="top">
        <h1>设置</h1>
        <el-form-item label="图片压缩率" style="width: 25%" >
            <el-slider v-model="setting.image_compressibility" :max="100" :min="20"
                       @click="change_image_compressibility" show-input/>
        </el-form-item>
        <el-form-item label="图片保存方式">
            <el-switch
                v-model="setting.image_save_is_file"
                class="mb-2"
                active-text="文件"
                inactive-text="数据库"
                @change="change_image_save_method"
            />
        </el-form-item>
        <el-form-item label="清除未使用图片">
            <el-button type="primary" plain @click="console.log(setting)">点击清除</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="js">
import {reactive, ref, onMounted,} from 'vue';

import {MyRequestMixin} from "../../units/my_requests.js";
import {setting_image_url,change_image_save_method_url,change_image_compressibility_url} from "../../units/my_global_url.js";

onMounted(
    async () => {
        setting.value = (await MyRequestMixin.get_data(setting_image_url)).data
    }
)
const setting = ref({
    //默认ture为文件保存,false数据库base64
    image_save_is_file: true,
    image_compressibility: 100,
});

function change_image_save_method(){
    MyRequestMixin.post_data(change_image_save_method_url,{"image_save_is_file":setting.value.image_save_is_file})
}
function change_image_compressibility(){
    MyRequestMixin.post_data(change_image_compressibility_url,{"image_compressibility":setting.value.image_compressibility})
}


</script>


<style>

.setting {
    padding: 10px;
}

.setting div {
    /*margin: 20px;*/
}
</style>