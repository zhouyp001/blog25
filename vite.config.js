import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 根站点用 '/'；项目页用 '/<repo>/'，也可以在构建时用 BASE_PATH 环境变量覆盖
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [vue()]
})