<script setup lang="ts">
const isOpen = ref(false)
const activeIndex = ref(-1)
const menuItems = ref<HTMLElement[]>([])

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % menuItems.value.length
    menuItems.value[activeIndex.value]?.focus()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value =
      (activeIndex.value - 1 + menuItems.value.length) % menuItems.value.length
    menuItems.value[activeIndex.value]?.focus()
  } else if (event.key === 'Escape') {
    closeDropdown()
  }
}

provide('isOpen', isOpen)
provide('toggleDropdown', toggleDropdown)
provide('closeDropdown', closeDropdown)
provide('registerItem', (item: HTMLElement) => {
  menuItems.value.push(item)
})
</script>

<template>
  <div class="dropdown-menu" ref="menuRef" @keydown="handleKeydown">
    <slot />
  </div>
</template>

<style scoped>
.dropdown-menu {
  display: inline-block;
  position: relative;
}
</style>
