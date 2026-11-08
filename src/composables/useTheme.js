import { ref } from 'vue'

const theme = ref(document.documentElement.getAttribute('data-theme') || 'light')

function apply(next) {
  theme.value = next
  document.documentElement.setAttribute('data-theme', next)
  try {
    localStorage.setItem('theme', next)
  } catch (e) {}
}

export function useTheme() {
  function toggleTheme() {
    apply(theme.value === 'dark' ? 'light' : 'dark')
  }
  return { theme, toggleTheme }
}