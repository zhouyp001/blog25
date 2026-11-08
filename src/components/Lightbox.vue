<template>
  <div class="lightbox" @click.self="$emit('close')">
    <button class="lightbox-close" aria-label="关闭" @click="$emit('close')">×</button>
    <figure>
      <img :src="src" :alt="alt" />
      <figcaption v-if="alt">{{ alt }}</figcaption>
    </figure>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' }
})
const emit = defineEmits(['close'])

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKey)
  document.body.style.overflow = 'hidden'
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>