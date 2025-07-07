<script setup lang="ts">
const { toasts, updateToasts } = useToasts()

const hide = (id: string) => {
  const filteredToasts = toasts.value.filter(toast => toast.id !== id)
  updateToasts(filteredToasts)
}
</script>

<template>
  <ol role="region" tabindex="-1" class="container toast-container">
    <TransitionGroup name="fade">
      <ToastItem
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
        @close="hide"
      />
    </TransitionGroup>
  </ol>
</template>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  z-index: 10000;
  top: 8%;
  width: fit-content;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
