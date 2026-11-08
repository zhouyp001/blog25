import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Category from './views/Category.vue'
import Reader from './views/Reader.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home, meta: { sidebar: false } },
    { path: '/category', component: Category },
    { path: '/read', component: Reader },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    return { top: 0 }
  }
})