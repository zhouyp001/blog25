import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 根站点：BASE_PATH 不设，base 为 '/'
// 项目页：构建时设置 BASE_PATH=/仓库名/
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
  server: { port: 5173 }
})