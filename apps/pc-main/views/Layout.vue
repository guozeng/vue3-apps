<template>
  <div>{{ authStore.token }}</div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../store'
const authStore = useAuthStore()

setTimeout(() => {
  authStore.token = 'adsd111'
}, 1000)
</script>
