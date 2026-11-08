<template>
  <div>
    <div class="reader-bar">
      <router-link to="/">← 返回目录</router-link>
      <span class="title">{{ title }}</span>
    </div>
    <MarkdownViewer :url="url" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownViewer from '../components/MarkdownViewer.vue'

const route = useRoute()
const url = computed(() => String(route.query.p || ''))

const title = computed(() => {
  const last = decodeURIComponent(url.value.split('/').pop() || '')
  return last.replace(/\.md$/i, '')
})
</script>