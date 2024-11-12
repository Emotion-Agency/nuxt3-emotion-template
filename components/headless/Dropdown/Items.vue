<script setup lang="ts">
const isOpen = inject('isOpen') as Ref<boolean>
</script>

<template>
  <div v-if="isOpen" class="dropdown-items" role="menu">
    <slot />
  </div>
</template>

<style scoped>
.dropdown-items {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
