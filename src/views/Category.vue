<template>
  <div class="category-page">
    <nav class="breadcrumb">
      <router-link to="/">首页</router-link>
      <span class="sep">/</span>
      <span>{{ name }}</span>
    </nav>

    <div v-if="!loaded" class="status">加载中…</div>
    <div v-else-if="!items.length" class="status">没有找到该分类</div>
    <template v-else>
      <h1 class="page-title">{{ name }}<small>{{ items.length }} 篇</small></h1>
      <section v-for="group in groups" :key="group.sub || '__root'" class="sub-group">
        <h2 v-if="group.sub" class="sub-title">{{ group.sub }}<small>{{ group.items.length }} 篇</small></h2>
        <ul class="article-list">
          <li v-for="a in group.items" :key="a.path">
            <router-link :to="{ path: '/read', query: { p: a.url } }">{{ a.title }}</router-link>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArticles } from '../composables/useArticles'

const route = useRoute()
const { articles, loaded, load } = useArticles()

const name = computed(() => String(route.query.c || ''))

const items = computed(() => articles.value.filter((a) => a.category === name.value))

const groups = computed(() => {
  const map = new Map()
  for (const a of items.value) {
    const key = a.sub || ''
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(a)
  }
  return [...map.entries()]
    .sort((a, b) => (a[0] === '' ? -1 : b[0] === '' ? 1 : a[0].localeCompare(b[0], 'zh')))
    .map(([sub, list]) => ({ sub, items: list }))
})

onMounted(() => {
  load()
})
</script>