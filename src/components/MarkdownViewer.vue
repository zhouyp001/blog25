<template>
  <div v-if="loading" class="status">加载中…</div>
  <div v-else-if="error" class="status error">
    加载失败：{{ error }}
    <br><br>
    <button @click="loadArticle(props.url)" style="padding: 4px 12px; cursor: pointer;">点击重试</button>
  </div>
  <article
    v-else
    ref="articleEl"
    class="markdown-body"
    v-html="html"
    @click="onArticleClick"
  ></article>
</template>

<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'

const props = defineProps({
  url: { type: String, required: true },
  imagesAt: { type: String, default: 'root' }
})
const emit = defineEmits(['headings', 'preview'])

const articleEl = ref(null)
const html = ref('')
const loading = ref(true)
const error = ref(null)

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  })
)
marked.setOptions({ gfm: true, breaks: false })

let imageContext = { dirUrl: '', imagesAt: 'root' }

function resolveImage(src) {
  if (!src) return src
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:') || src.startsWith('blob:')) return src
  
  let p = src.replace(/^\.\//, '')
  if (p.startsWith('/')) return base + p
  
  if (imageContext.imagesAt === 'local' && imageContext.dirUrl) {
    return `${base}/markdown/${imageContext.dirUrl}/${p}`
  }
  return `${base}/${p}`
}

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'IMG') {
    const src = node.getAttribute('src')
    if (src) node.setAttribute('src', resolveImage(src))
    node.setAttribute('loading', 'lazy')

    // ---- 识别行内公式图片（LaTeX / codecogs），后续由 CSS 以 inline-block 显示 ----
    const alt = node.getAttribute('alt') || ''
    if (/\\[a-zA-Z]+/.test(alt) || /codecogs\.com/i.test(src || '')) {
      node.classList.add('inline-formula')
    }
    // ------------------------------------------------------------------------------
  }
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

async function loadArticle(url) {
  if (!url) {
    error.value = '缺少文章路径'
    loading.value = false
    return
  }
  loading.value = true
  error.value = null
  html.value = ''
  emit('headings', [])
  
  try {
    // 将标准编码路径中的 %2B 还原成 +，防止服务器将 + 转义为空格
    const safeUrl = url.replace(/%2B/gi, '+')
    const fetchUrl = `${base}/markdown/${safeUrl}`

    const res = await fetch(fetchUrl)
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} (找不到文件)`)
    }
    
    const text = await res.text()
    
    // 检查是否错误地加载了网站首页
    const trimmed = text.trim()
    if (trimmed.startsWith('<!doctype') || trimmed.startsWith('<!DOCTYPE') || trimmed.includes('<div id="app"></div>')) {
      throw new Error('服务器返回了网页框架（请检查 public/markdown 下是否有该文件）')
    }

    imageContext = {
      dirUrl: safeUrl.split('/').slice(0, -1).join('/'),
      imagesAt: props.imagesAt
    }
    
    html.value = DOMPurify.sanitize(marked.parse(text))
    await nextTick()
    postProcess()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function postProcess() {
  const root = articleEl.value
  if (!root) return

  const headings = []
  root.querySelectorAll('h1, h2, h3').forEach((h, i) => {
    const id = `h-${i}`
    h.id = id
    headings.push({ id, text: h.textContent.trim(), level: Number(h.tagName[1]) })
  })
  emit('headings', headings)

  root.querySelectorAll('pre').forEach((pre) => {
    if (pre.querySelector('.copy-btn')) return
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'copy-btn'
    btn.textContent = '复制'
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.innerText ?? pre.innerText
      try {
        await navigator.clipboard.writeText(code)
        btn.textContent = '已复制'
      } catch (e) {
        btn.textContent = '复制失败'
      }
      setTimeout(() => (btn.textContent = '复制'), 1500)
    })
    pre.appendChild(btn)
  })
}

function onArticleClick(e) {
  if (e.target.tagName === 'IMG') {
    emit('preview', e.target.src, e.target.alt || '')
  }
}

watch(
  () => [props.url, props.imagesAt],
  ([url]) => loadArticle(url),
  { immediate: true }
)

onBeforeUnmount(() => {
  emit('headings', [])
})
</script>