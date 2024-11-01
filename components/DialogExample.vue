<script lang="ts" setup>
const isModalOpen = ref(false)

const openModal = (value: boolean) => {
  isModalOpen.value = value
}
</script>

<template>
  <div>
    <HeadlessButton @click="openModal(true)">Open</HeadlessButton>
    <Teleport to="#teleports">
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
          <h3>Delete title</h3>
          <p>Dialog content</p>
          <HeadlessButton @click="openModal(false)">Close</HeadlessButton>
        </HeadlessDialogWindow>
      </HeadlessDialogModal>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
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
  width: 90%;
  max-width: 623px;
  height: fit-content;
  background-color: white;
  border-radius: 10px;
  max-height: 90vh;
  overflow: auto;
  transition: transform 0.3s ease;
  z-index: 2;
  transition: all 0.3s ease;
  transform: translate(-50%, -50%) translateY(50px);
  opacity: 0;
  &.is-open {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(0px);
  }
}
</style>
