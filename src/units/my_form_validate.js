function form_validate(form, run_function_name) {
    if (!form) return
    form.validate((valid) => {
        if (valid) {
            run_function_name()
        } else {
            console.log('error submit!')
            return false
        }
    })
}

export {
    form_validate
}