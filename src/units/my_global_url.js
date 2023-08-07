const debug = false
let backend_url = "http://localhost:1234/"
let front_url = 'http://localhost:5173/'
if (!debug){
    backend_url = "https://riyueweiyi.cn/"
    front_url = 'https://riyueweiyi.cn/'
}

//登录认证后端地址
const login_url = backend_url + "api/login_verification/"
//文章交互后端地址,网页访客
const article_url = backend_url + "api/article/"
//文章摘要交互后端地址,网页访客
const article_summary_url = backend_url + "api/article_summary/"
//文章交互后端地址,网页访客
const article_root_url = backend_url + "api/article_root/"
//文章摘要交互后端地址,网页访客
const article_summary_root_url = backend_url + "api/article_summary_root/"
//分类交互后端地址
const category_url = backend_url + "api/category/"
//分类级联选择地址
const category_summary_url = backend_url + "api/category_summary/"
const setting_image_url = backend_url + "api/setting_image/"
const change_image_save_method_url = backend_url+ "api/change_image_save_method/"
const change_image_compressibility_url = backend_url+  "api/change_image_compressibility/"

export {
    backend_url,
    front_url,
    login_url,
    article_url,
    article_root_url,
    article_summary_url,
    article_summary_root_url,
    category_url,
    category_summary_url,
    setting_image_url,
    change_image_save_method_url,
    change_image_compressibility_url,
}