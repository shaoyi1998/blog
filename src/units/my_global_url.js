//是否为测试环境
const is_test = true

let backend_url;
let front_url;
if (is_test) {
    backend_url = 'http://localhost:1234/'
    front_url = 'http://localhost:5173/'
} else {
    backend_url = 'http://你的域名:端口号/'
    front_url = 'http://你的域名:端口号/'
}
//登录认证后端地址
const login_url = backend_url + "api/login_verification/"
//文章交互后端地址
const article_url = backend_url + "api/article/"
//文章摘要交互后端地址
const article_summary_url = backend_url + "api/article_summary/"
//分类交互后端地址
const category_url = backend_url + "api/category/"
//分类级联选择地址
const category_summary_url = backend_url+ "api/category_summary"
export {
    backend_url,
    front_url,
    login_url,
    article_url,
    article_summary_url,
    category_url,
    category_summary_url
}