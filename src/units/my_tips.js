import {ElMessage, ElMessageBox} from "element-plus";

class MyTipsMixin {
    static success_tip(message = "成功") {
        ElMessage({
            showClose: true,
            message: message,
            type: 'success',
        })
    }

    static warn_tip(message = "警告") {
        ElMessage({
            showClose: true,
            message: message,
            type: 'warning',
        })
    }

    static error_tip(message = "错误") {
        ElMessage({
            showClose: true,
            message: message,
            type: 'error',
        })
    }

    static tip_tip(message = "提示") {
        ElMessage({
            showClose: true,
            message: message,
        })
    }

    static confirm_delete(id,run_function_name){
        ElMessageBox.confirm(
            '你确认要执行删除操作吗?',
            '操作确认',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                run_function_name(id)
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消成功',
                })
            })
    }

}

export {
    MyTipsMixin
}
