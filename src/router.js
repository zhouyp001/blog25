import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Reader from './views/Reader.vue'

// 用 hash 模式，GitHub Pages 刷新不会 404
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/read', component: Reader }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})