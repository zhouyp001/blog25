<template>
  <div class="reader">
    <div class="reader-progress" :style="{ width: progress + '%' }"></div>

    <div v-if="!loaded" class="status">加载中…</div>
    <div v-else-if="!article" class="status">文章不存在或已被移动</div>
    <div v-else class="reader-layout">
      <div class="reader-main">
        <nav class="breadcrumb">
          <router-link to="/">首页</router-link>
          <span class="sep">/</span>
          <router-link :to="{ path: '/category', query: { c: article.category } }">
            {{ article.category }}
          </router-link>
          <span class="sep">/</span>
          <span class="current">{{ article.title }}</span>
        </nav>

        <h1 class="reader-title">{{ article.title }}</h1>
        <p class="reader-meta">
          {{ article.wordCount }} 字 · 约 {{ article.readingMinutes }} 分钟
        </p>

        <MarkdownViewer
          :url="article.url"
          :images-at="article.imagesAt"
          @headings="headings = $event"
          @preview="openPreview"
        />

        <nav class="pager">
          <router-link
            v-if="prev"
            class="pager-link"
            :to="{ path: '/read', query: { p: prev.url } }"
          >
            <span class="pager-label">← 上一篇</span>
            <span class="pager-title">{{ prev.title }}</span>
          </router-link>
          <span v-else class="pager-link placeholder"></span>

          <router-link
            v-if="next"
            class="pager-link right"
            :to="{ path: '/read', query: { p: next.url } }"
          >
            <span class="pager-label">下一篇 →</span>
            <span class="pager-title">{{ next.title }}</span>
          </router-link>
          <span v-else class="pager-link placeholder"></span>
        </nav>
      </div>

      <aside v-if="headings.length" class="reader-toc">
        <div class="toc-title">本文目录</div>
        <ul>
          <li
            v-for="h in headings"
            :key="h.id"
            :class="['toc-item', 'level-' + h.level, { active: activeId === h.id }]"
          >
            <a :href="'#' + h.id" @click.prevent="scrollTo(h.id)">{{ h.text }}</a>
          </li>
        </ul>
      </aside>
    </div>

    <Lightbox v-if="previewSrc" :src="previewSrc" :alt="previewAlt" @close="closePreview" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownViewer from '../components/MarkdownViewer.vue'
import Lightbox from '../components/Lightbox.vue'
import { useArticles } from '../composables/useArticles'

const route = useRoute()
const { articles, loaded, load } = useArticles()

const headings = ref([])
const activeId = ref('')
const progress = ref(0)
const previewSrc = ref('')
const previewAlt = ref('')

const url = computed(() => String(route.query.p || ''))
const article = computed(() => articles.value.find((a) => a.url === url.value))

const siblings = computed(() => {
  if (!article.value) return []
  return articles.value.filter((a) => a.category === article.value.category)
})

const prev = computed(() => {
  if (!article.value) return null
  const list = siblings.value
  const i = list.findIndex((a) => a.url === article.value.url)
  return i > 0 ? list[i - 1] : null
})

const next = computed(() => {
  if (!article.value) return null
  const list = siblings.value
  const i = list.findIndex((a) => a.url === article.value.url)
  return i >= 0 && i < list.length - 1 ? list[i + 1] : null
})

function onScroll() {
  const el = document.documentElement
  const max = el.scrollHeight - el.clientHeight
  progress.value = max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0

  if (!headings.value.length) return
  const offset = 100
  let current = headings.value[0].id
  for (const h of headings.value) {
    const node = document.getElementById(h.id)
    if (!node) continue
    if (node.getBoundingClientRect().top <= offset) current = h.id
  }
  activeId.value = current
}

function scrollTo(id) {
  const node = document.getElementById(id)
  if (!node) return
  const top = node.getBoundingClientRect().top + window.scrollY - 72
  window.scrollTo({ top, behavior: 'smooth' })
}

function openPreview(src, alt) {
  previewSrc.value = src
  previewAlt.value = alt
}

function closePreview() {
  previewSrc.value = ''
  previewAlt.value = ''
}

watch(
  () => article.value?.url,
  async () => {
    headings.value = []
    activeId.value = ''
    await nextTick()
    onScroll()
  }
)

onMounted(() => {
  load()
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>