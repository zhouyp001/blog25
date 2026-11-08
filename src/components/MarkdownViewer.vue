<template>
  <div v-if="loading" class="status">加载中…</div>
  <div v-else-if="error" class="status error">加载失败：{{ error }}</div>
  <article v-else class="markdown-body" v-html="html"></article>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'

const props = defineProps({
  url: { type: String, required: true }
})

const raw = ref('')
const loading = ref(false)
const error = ref(null)

// 模块级实例，避免每次渲染重复创建
const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  })
)
marked.setOptions({ gfm: true, breaks: false })

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

// 把 img/xxx.png 映射到 BASE_URL + img/xxx.png；外链和 data: 原样保留
function normalizeImage(src) {
  if (!src) return src
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) return src
  if (src.startsWith('/')) return base + src
  return base + '/' + src.replace(/^\.\//, '')
}

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'IMG') {
    const src = node.getAttribute('src')
    if (src) node.setAttribute('src', normalizeImage(src))
  }
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

const html = computed(() => {
  if (!raw.value) return ''
  return DOMPurify.sanitize(marked.parse(raw.value))
})

async function load() {
  if (!props.url) {
    error.value = '缺少文章路径'
    return
  }
  loading.value = true
  error.value = null
  raw.value = ''
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}markdown/${props.url}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    raw.value = await res.text()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

watch(() => props.url, load, { immediate: true })
</script>