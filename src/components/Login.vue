<template>
    <el-container class="el-container">
        <el-form
            ref="form"
            :model="LoginForm"
            label-width="auto"
            label-position="top"
            size="default"
            class="login-from"
        >
            <h1>登录</h1>
            <el-form-item label="姓名" prop="username">
                <el-input v-model="LoginForm.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="LoginForm.password" show-password type="password"/>
            </el-form-item>
            <el-form-item>
                <div class="button">
                    <el-button type="primary" @click="login()">登录</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-container>

</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {FormInstance} from "element-plus";
import Cookies from "js-cookie"

import {MyRequestMixin} from "../units/my_requests.js"
import {MyTipsMixin} from  "../units/my_tips.js"

const LoginForm = reactive({
    username: '',
    password: '',
});

const tip = ref("")
//提交按钮submit绑定用实例
const form = ref<FormInstance>()

async function login() {
    const response = await MyRequestMixin.login(LoginForm)
    if (response.error){
        MyTipsMixin.error_tip(response.error)
        }
    else{
        MyTipsMixin.success_tip("登陆成功,即将跳转后台")
        Cookies.set("token", response.data.access, {expires: 3 / 48})
        Cookies.set("id", response.data.id, {expires: 3 / 48})
        Cookies.set("username", response.data.username, {expires: 3 / 48})
        setTimeout(() => {
            window.location.href = "./manage"
        }, 500)
    }
}


onMounted(() => {
    if (Cookies.get("token")) {
        document.location.href = "./"
    }
})



</script>


<style scoped>
* {
    font-size: 10px
}

h1 {
    text-align: center;
    font-size: 30px;
}



.login-from {
    width: 70em;
    padding: 5em;
    height: fit-content;
    background: linear-gradient(180deg, rgba(255, 241, 235, 0.25) 0%, rgba(172, 224, 249, 1) 100%);
    box-sizing: border-box;
    border-radius: 5em;
    border: 1em solid #a0cfff;
}



.title_text strong {
    padding: 0.2em;
    font-size: 3.5em;
    left: 0;
}

.title_img img {
    max-height: 6em;
    min-width: 6em;
    padding: 0.2em;
    border-radius: 20%;
}

.button {

    display: flex;
    justify-content: center;
    width: 100%;
}


.el-container{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

</style>