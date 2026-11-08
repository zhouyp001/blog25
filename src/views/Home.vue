<template>
  <div v-if="loading" class="status">加载目录中…</div>
  <div v-else-if="error" class="status error">加载文章索引失败：{{ error }}</div>
  <div v-else>
    <section v-for="group in groups" :key="group.category" class="category">
      <h2>{{ group.category }} <small>({{ group.items.length }})</small></h2>
      <ul>
        <li v-for="item in group.items" :key="item.path">
          <router-link :to="{ path: '/read', query: { p: item.url } }">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const articles = ref([])
const loading = ref(true)
const error = ref(null)

const groups = computed(() => {
  const map = new Map()
  for (const a of articles.value) {
    if (!map.has(a.category)) map.set(a.category, [])
    map.get(a.category).push(a)
  }
  return [...map.entries()].map(([category, items]) => ({ category, items }))
})

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}articles.json`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    articles.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>