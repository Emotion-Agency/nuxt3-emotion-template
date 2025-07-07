<script setup lang="ts">
import { gsap } from '~/libs/gsap'
import type { iToast } from '~/composables/toast'

interface iProps {
  toast: iToast
}

const props = defineProps<iProps>()
const emit = defineEmits(['close'])

const $progress = ref(null)

const onClose = (id: string) => {
  emit('close', id)
}

onMounted(async () => {
  await nextTick()

  gsap.to($progress.value, {
    duration: 5,
    width: '100%',
    ease: 'linear',
    onComplete: () => {
      onClose(props.toast.id)
    },
  })
})

const el = useTemplateRef('el')

const startX = ref(0)
const x = ref(0)

const onMouseDown = (event: MouseEvent) => {
  startX.value = event.clientX

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const onMouseUp = () => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)

  const elWidth = el.value.offsetWidth
  const rightOffset = window.innerWidth - el.value.getBoundingClientRect().left

  if (Math.abs(x.value) > 50) {
    gsap.to(x, {
      value: rightOffset + elWidth,
      duration: 0.5,
      onComplete: () => {
        onClose(props.toast.id)
      },
    })
  } else {
    gsap.to(x, {
      value: 0,
      duration: 0.5,
    })
  }
}

const onMouseMove = (event: MouseEvent) => {
  const diff = event.clientX - startX.value
  if (diff < 0) return

  x.value = event.clientX - startX.value
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <li
    ref="el"
    role="alert"
    aria-live="off"
    aria-atomic="true"
    class="toast"
    tabindex="0"
    :class="`toast--${toast.color}`"
    :style="{
      transform: `translateX(${x}px)`,
    }"
    @keydown.escape="onClose(toast.id)"
    @mousedown="onMouseDown"
  >
    <div ref="$progress" class="toast__progress" />
    <p class="toast__text">
      {{ toast.text }}
    </p>
    <button class="toast__close-btn" @click.prevent="onClose(toast.id)">
      <span class="toast__close-line" />
      <span class="toast__close-line" />
    </button>
  </li>
</template>

<style lang="scss" scoped>
.toast {
  position: relative;
  overflow: hidden;
  user-select: none;
  display: flex;
  align-items: flex-start;
  column-gap: 12px;
  color: var(--primary-button-text);
  padding: 16px;
  width: fit-content;

  border-radius: 10px;

  &--success {
    background-color: var(--status-success);
  }

  &--danger {
    background-color: var(--status-danger);
  }

  &--info {
    background-color: var(--primary);
  }

  + .toast {
    margin-top: 10px;
  }
}

.toast__progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-button-text);
}

.toast__icon {
  display: block;
  width: 16px;
  height: 16px;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.toast__close-btn {
  position: relative;
  width: 16px;
  height: 16px;
  display: block;
  background-color: transparent;
}

.toast__close-line {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--primary-button-text);

  &:first-child {
    transform: rotate(45deg);
  }

  &:last-child {
    transform: rotate(-45deg);
  }
}
</style>
