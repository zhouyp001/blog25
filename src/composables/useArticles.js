import { ref, computed } from 'vue'

const articles = ref([])
const loaded = ref(false)
let pending = null

async function load() {
  if (loaded.value) return articles.value
  if (pending) return pending
  pending = fetch(`${import.meta.env.BASE_URL}articles.json`)
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      return r.json()
    })
    .then((data) => {
      articles.value = data
      loaded.value = true
      return data
    })
  return pending
}

export function useArticles() {
  const categories = computed(() => {
    const map = new Map()
    for (const a of articles.value) {
      if (!map.has(a.category)) map.set(a.category, [])
      map.get(a.category).push(a)
    }
    return [...map.entries()].map(([name, items]) => {
      const subs = [...new Set(items.map((i) => i.sub).filter(Boolean))]
      return {
        name,
        items,
        count: items.length,
        subs,
        keywords: subs.slice(0, 4)
      }
    })
  })

  return { articles, loaded, load, categories }
}