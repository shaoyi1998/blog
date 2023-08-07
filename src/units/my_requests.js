import axios from "axios";
import Cookies from "js-cookie";

import {login_url} from "./my_global_url.js"

//所有向api请求的方法均在此处定义

class MyRequestMixin {

    static async get_data(url, jwt_config_head = Cookies.get("token")) {
        try {
            return await axios.get(url, {headers: {"Authorization": "Bearer " + jwt_config_head}})
        } catch (error) {
            return this.error_handle(error)
        }
    }

    static async put_data(url, data, jwt_config_head = Cookies.get("token")) {
        try {
            return await axios.put(url, data, {headers: {"Authorization": "Bearer " + jwt_config_head}})
        } catch (error) {
            return this.error_handle(error)
        }
    }

    static async post_data(url, data, jwt_config_head = Cookies.get("token"), csrftoken = Cookies.get('csrftoken')) {
        try {
            return await axios.post(url, data, {
                headers: {"Authorization": "Bearer " + jwt_config_head, "x-csrftoken": csrftoken,},
            })
        } catch (error) {
            return this.error_handle(error)
        }
    }

    static async delete_data(url, jwt_config_head = Cookies.get("token")) {
        try {
            return await axios.delete(url, {headers: {"Authorization": "Bearer " + jwt_config_head}})
        } catch (error) {
            return this.error_handle(error)
        }
    }

    static async login(verification_data) {
        try {
            return (await axios.post(login_url, verification_data))
        } catch (error) {
            return this.error_handle(error)
        }
    }

    static error_handle(error) {
        console.log("错误", error)
        if (error.code === "ERR_NETWORK") {
            return {"error": "后台服务器错误,请联系服务器管理员"}
        } else if (error.code === "ERR_BAD_REQUEST") {
            if (error.response.status === 401) {
                Cookies.remove("token")
                Cookies.remove("id")
                Cookies.remove("username")
                Cookies.remove("check_code")
                setTimeout(() => {
                    window.location.href = "./login"
                }, 500)
                return {"error": "令牌token过期,请重新登录,3秒后返回登录界面"}
            } else if (error.response.status === 400) {
                return {"error": error.response.data}
            }
            return {"error": error.response.data.non_field_errors[0] || "密码错误"}
        } else if (error.code === "ERR_BAD_RESPONSE") {
            return {"error": "后台处理失败,请重试或联系开发人员"}
        } else {
            return {"error": error.code || "未知的错误,请联系管理员"}
        }
    }

}

export {
    MyRequestMixin
}