<script setup lang="ts">
import { DialogContent, DialogOverlay, DialogRoot } from 'reka-ui'
import type { HtmlHTMLAttributes } from 'vue'

defineProps<{
  windowAttrs?: HtmlHTMLAttributes
}>()

const isOpen = defineModel<boolean>('open')
</script>

<template>
  <DialogRoot v-slot="{ open }" v-model:open="isOpen">
    <Transition name="dialog">
      <Teleport to="#teleports">
        <div v-if="open" class="dialog" v-bind="$attrs">
          <DialogOverlay class="dialog__backdrop" @click="isOpen = false" />
          <DialogContent
            class="dialog__window"
            :aria-describedby="undefined"
            v-bind="windowAttrs"
          >
            <slot />
          </DialogContent>
        </div>
      </Teleport>
    </Transition>
  </DialogRoot>
</template>

<style scoped lang="scss">
.dialog {
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 50;
}

.dialog__backdrop {
  inset: 0;
  background-color: var(--backdrop);
  position: fixed;
  z-index: 1;
  backdrop-filter: blur(3px);
}

.dialog__window {
  position: relative;
  max-width: rem(600);
  min-width: rem(520);
  overflow: hidden;
  background-color: var(--card);
  border-radius: var(--rounded-lg);
  max-height: 95vh;
  transition: all 0.3s ease;

  z-index: 2;

  @media (max-width: rem(540)) {
    min-width: auto;
    width: 90%;
  }
}

.dialog-enter-from {
  opacity: 0;
  .dialog__window {
    opacity: 0;
    transform: translateY(50px);
  }
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.5s ease;
}

.dialog-enter,
.dialog-leave-to {
  opacity: 0;
  .dialog__window {
    opacity: 0;
    transform: translateY(50px);
  }
}
</style>
