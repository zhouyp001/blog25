<template>
  <header class="app-header">
    <div class="header-inner">
      <button class="nav-toggle-btn" aria-label="打开目录" @click="$emit('toggle-nav')">☰</button>
      <router-link to="/" class="brand">{{ config.title }}</router-link>

      <div class="search-wrap" ref="searchWrap">
        <span class="search-icon">🔍</span>
        <input
          ref="searchInput"
          v-model="query"
          class="search-input"
          type="search"
          placeholder="搜索笔记 (Ctrl+K)"
          @focus="open = true"
          @keydown.down.prevent="move(1)"
          @keydown.up.prevent="move(-1)"
          @keydown.enter.prevent="go(results[activeIndex])"
          @keydown.esc="close"
        />
        <div v-if="open && query.trim()" class="search-panel">
          <div v-if="!results.length" class="search-empty">没有找到相关结果</div>
          <ul v-else>
            <li
              v-for="(r, i) in results"
              :key="r.path"
              :class="{ active: i === activeIndex }"
              @mouseenter="activeIndex = i"
              @mousedown.prevent="go(r)"
            >
              <div class="result-title">{{ r.title }}</div>
              <div class="result-meta">
                {{ r.category }}<template v-if="r.sub"> / {{ r.sub }}</template>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="header-actions">
        <button
          class="icon-btn"
          :title="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
          @click="toggleTheme"
        >
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>
        <a
          v-if="config.github"
          class="icon-btn github-link"
          :href="config.github"
          target="_blank"
          rel="noopener noreferrer"
        >Github</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { siteConfig as config } from '../config'
import { useArticles } from '../composables/useArticles'
import { useTheme } from '../composables/useTheme'

defineEmits(['toggle-nav'])

const router = useRouter()
const { articles, load } = useArticles()
const { theme, toggleTheme } = useTheme()

const query = ref('')
const open = ref(false)
const activeIndex = ref(0)
const searchWrap = ref(null)
const searchInput = ref(null)

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  const scored = []
  for (const a of articles.value) {
    const title = a.title.toLowerCase()
    const cat = a.category.toLowerCase()
    const sub = (a.sub || '').toLowerCase()
    const ex = (a.excerpt || '').toLowerCase()
    let score = 0
    if (title.includes(q)) score = 100
    else if (sub.includes(q) || cat.includes(q)) score = 50
    else if (ex.includes(q)) score = 20
    if (score) scored.push({ ...a, score })
  }
  return scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'zh')).slice(0, 8)
})

function move(delta) {
  if (!results.value.length) return
  activeIndex.value = (activeIndex.value + delta + results.value.length) % results.value.length
}

function go(item) {
  if (!item) return
  router.push({ path: '/read', query: { p: item.url } })
  close()
}

function close() {
  open.value = false
  activeIndex.value = 0
  searchInput.value?.blur()
}

function onDocClick(e) {
  if (!searchWrap.value?.contains(e.target)) open.value = false
}

function onKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value = true
    searchInput.value?.focus()
  }
}

onMounted(() => {
  load()
  document.addEventListener('mousedown', onDocClick)
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>