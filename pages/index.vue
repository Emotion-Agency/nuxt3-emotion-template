<script setup lang="ts">
const isModalOpen = ref(false)

const openModal = (value: boolean) => {
  isModalOpen.value = value
}
</script>

<template>
  <main>
    <h1 class="22">Hello from Emotion!</h1>
    <HeadlessButton @click="openModal(true)">Open</HeadlessButton>
    <HeadlessLoader />

    <HeadlessDialogModal
      class="dialog"
      :is-open="isModalOpen"
      :duration="0.3"
      @close="openModal(false)"
    >
      <HeadlessDialogBackdrop
        class="dialog-backdrop"
        @click="openModal(false)"
      ></HeadlessDialogBackdrop>
      <HeadlessDialogWindow class="dialog-window">
        <h2>Dialog</h2>
        <p>Dialog content</p>
        <HeadlessButton @click="openModal(false)">Close</HeadlessButton>
      </HeadlessDialogWindow>
    </HeadlessDialogModal>
  </main>
</template>

<style lang="scss">
.dialog {
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 50;
}

.dialog-backdrop {
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 1;
}

.dialog-window {
  @include vcenter(absolute);
  transform: translate(-50%, -50%) translateY(50px);
  width: 300px;
  height: 150px;
  background-color: #fff;
  z-index: 2;
  opacity: 0;
  transition: all 0.3s ease;
  &.is-open {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(0px);
  }
}
</style>
