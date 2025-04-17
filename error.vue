<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <main>
    <p>{{ error.statusCode }}</p>
    <button @click="handleError">Go back</button>
  </main>
</template>
