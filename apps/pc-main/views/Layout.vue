<template>
  <div>{{ authStore.token }}</div>
  <div @click="go">跳转</div>
</template>

<script setup>
import { useAuthStore } from '../store'

const authStore = useAuthStore()

const aa = ref('')

const rt = useRouter()

function go() {
  rt.push('/')
}

setTimeout(() => {
  authStore.token = 'adsd111'
}, 1000)
</script>
