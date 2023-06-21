import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/media': {
                target: 'http://127.0.0.1:1234/',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        }
    }
})
