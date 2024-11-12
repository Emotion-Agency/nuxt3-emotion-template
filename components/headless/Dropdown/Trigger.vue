<script setup lang="ts">
const toggleDropdown = inject('toggleDropdown') as () => void
</script>

<template>
  <button
    @click="toggleDropdown"
    @keydown.space.prevent="toggleDropdown"
    @keydown.enter.prevent="toggleDropdown"
    ref="triggerRef"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>
