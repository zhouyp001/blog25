<template>
  <div class="home">
    <header class="home-hero">
      <div class="hero-badge">📚 个人知识库</div>
      <h1>{{ config.title }}</h1>
      <p class="hero-desc">{{ config.description }}</p>
      <div class="hero-meta">
        <span><strong>{{ articles.length }}</strong> 篇笔记</span>
        <span class="dot"></span>
        <span><strong>{{ categories.length }}</strong> 个分类</span>
      </div>
    </header>

    <div v-if="!loaded" class="status">加载目录中…</div>
    <div v-else class="category-grid">
      <router-link
        v-for="(c, i) in categories"
        :key="c.name"
        class="category-card"
        :style="{ '--card-accent': colorOf(c.name), animationDelay: i * 30 + 'ms' }"
        :to="{ path: '/category', query: { c: c.name } }"
      >
        <div class="card-icon">{{ iconOf(c.name) }}</div>
        <div class="card-body">
          <div class="card-head">
            <span class="card-name">{{ c.name }}</span>
            <span class="card-count">{{ c.count }} 篇</span>
          </div>
          <p class="card-desc">
            {{ c.keywords.length ? c.keywords.join(' · ') : '查看全部文章' }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { siteConfig as config } from '../config'
import { useArticles } from '../composables/useArticles'

const { articles, categories, loaded, load } = useArticles()

const ICONS = {
  'ACM+算法': '⚡',
  'Android': '📱',
  'JAVA': '☕',
  'JavaScript': '🟨',
  'linux使用教程': '🐧',
  'mysql': '🐬',
  'Python': '🐍',
  'R': '📊',
  'Windows API': '🪟',
  'windows使用教程': '🖥️',
  'WIN编程': '⚙️',
  '心得': '💭',
  '数据结构': '🌳',
  '新博客': '✍️',
  '汇编': '🔧',
  '汇编原理': '📐',
  '计算机组成原理': '🧮'
}

const COLORS = {
  'ACM+算法': '#F59E0B',
  'Android': '#34D399',
  'JAVA': '#F97316',
  'JavaScript': '#EAB308',
  'linux使用教程': '#64748B',
  'mysql': '#06B6D4',
  'Python': '#3B82F6',
  'R': '#2563EB',
  'Windows API': '#6366F1',
  'windows使用教程': '#8B5CF6',
  'WIN编程': '#A855F7',
  '心得': '#EC4899',
  '数据结构': '#10B981',
  '新博客': '#14B8A6',
  '汇编': '#EF4444',
  '汇编原理': '#F43F5E',
  '计算机组成原理': '#0EA5E9'
}

function iconOf(name) { return ICONS[name] || '📄' }
function colorOf(name) { return COLORS[name] || '#64748B' }

onMounted(() => {
  load()
})
</script>