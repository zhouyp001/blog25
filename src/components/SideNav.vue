<template>
  <nav class="side-nav" :class="{ 'drawer-open': drawerOpen }">
    <div v-for="c in categories" :key="c.name" class="nav-category">
      <button class="nav-toggle" @click="toggle(c.name)">
        <span class="chev" :class="{ open: isOpen(c.name) }">▸</span>
        <span class="nav-name">{{ c.name }}</span>
        <span class="nav-count">{{ c.count }}</span>
      </button>
      <div v-show="isOpen(c.name)" class="nav-body">
        <template v-for="group in groupOf(c)" :key="group.sub || '__root'">
          <div v-if="group.sub" class="nav-sub">{{ group.sub }}</div>
          <ul>
            <li v-for="a in group.items" :key="a.path">
              <router-link
                class="nav-link"
                :class="{ active: a.url === currentUrl }"
                :to="{ path: '/read', query: { p: a.url } }"
                @click="$emit('navigate')"
              >{{ a.title }}</router-link>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArticles } from '../composables/useArticles'

defineEmits(['navigate'])

const props = defineProps({
  drawerOpen: { type: Boolean, default: false }
})

const route = useRoute()
const { articles, categories, load } = useArticles()
const manual = ref({})

const currentUrl = computed(() => String(route.query.p || ''))

const autoOpenCategory = computed(() => {
  const a = articles.value.find((x) => x.url === currentUrl.value)
  return a ? a.category : ''
})

function isOpen(name) {
  if (name in manual.value) return manual.value[name]
  return name === autoOpenCategory.value
}

function toggle(name) {
  manual.value = { ...manual.value, [name]: !isOpen(name) }
}

function groupOf(category) {
  const map = new Map()
  for (const a of category.items) {
    const key = a.sub || ''
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(a)
  }
  return [...map.entries()]
    .sort((a, b) => (a[0] === '' ? -1 : b[0] === '' ? 1 : a[0].localeCompare(b[0], 'zh')))
    .map(([sub, items]) => ({ sub, items }))
}

watch(currentUrl, () => {
  manual.value = {}
})

onMounted(() => {
  load()
})
</script>