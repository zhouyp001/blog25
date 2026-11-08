<template>
  <div class="home">
    <header class="home-hero">
      <h1>{{ config.title }}</h1>
      <p class="hero-desc">{{ config.description }}</p>
      <p class="hero-meta">{{ articles.length }} 篇 · {{ categories.length }} 个分类</p>
    </header>

    <div v-if="!loaded" class="status">加载目录中…</div>
    <div v-else class="category-grid">
      <router-link
        v-for="c in categories"
        :key="c.name"
        class="category-card"
        :to="{ path: '/category', query: { c: c.name } }"
      >
        <div class="card-head">
          <span class="card-name">{{ c.name }}</span>
          <span class="card-count">{{ c.count }}</span>
        </div>
        <p class="card-desc">
          {{ c.keywords.length ? c.keywords.join(' · ') : '查看全部文章' }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { siteConfig as config } from '../config'
import { useArticles } from '../composables/useArticles'

const { articles, categories, loaded, load } = useArticles()

onMounted(() => {
  load()
})
</script>