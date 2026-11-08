<template>
  <div class="app-shell">
    <AppHeader @toggle-nav="drawerOpen = !drawerOpen" />
    <div class="app-body">
      <SideNav
        v-if="showSidebar"
        :class="{ 'drawer-open': drawerOpen }"
        @navigate="drawerOpen = false"
      />
      <div v-if="drawerOpen" class="drawer-mask" @click="drawerOpen = false"></div>
      <main class="app-main" :class="{ 'has-sidebar': showSidebar }">
        <router-view />
      </main>
    </div>
    <BackToTop />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import SideNav from './components/SideNav.vue'
import BackToTop from './components/BackToTop.vue'

const route = useRoute()
const drawerOpen = ref(false)
const showSidebar = computed(() => route.meta.sidebar !== false)

watch(() => route.fullPath, () => {
  drawerOpen.value = false
})
</script>