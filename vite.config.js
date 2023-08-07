import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/


//本地测试环境,生产环境使用nginx转发
const backend_url = "http://127.0.0.1:1234/"


export default defineConfig({
    plugins: [vue(),
    ],
    server: {
        // 注释下列代码打包时
        // proxy: {
        //     '/media': {
        //         target: backend_url,
        //         changeOrigin: true,
        //         secure: false,
        //         ws: true,
        //     },
        //     "/api":{
        //         target: backend_url,
        //         changeOrigin: true,
        //     }
        // }
    }
})
