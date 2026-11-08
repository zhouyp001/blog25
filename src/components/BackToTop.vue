<template>
  <transition name="fade">
    <button v-if="visible" class="back-to-top" aria-label="回到顶部" @click="toTop">↑</button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 600
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>