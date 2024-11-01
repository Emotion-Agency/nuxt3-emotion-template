<script setup lang="ts">
import { keysGenerator } from '@emotionagency/utils'

interface IProps {
  isOpen: boolean
  duration?: number
  transitionName?: string
}

const props = withDefaults(defineProps<IProps>(), {
  duration: 0.3,
  transitionName: 'fade',
})

const emit = defineEmits(['close'])

const isActualOpen = ref(props.isOpen)

const dialogId = `dialog-${keysGenerator(8)}`
const $el = ref<HTMLElement | null>(null)
const $focusGuard = ref<HTMLElement | null>(null)

const $window = ref<HTMLElement | null>(null)

onMounted(() => {
  $window.value = $el.value?.querySelector('[data-dialog-window]')

  if (!$window.value) {
    throw new Error('Dialog window not found')
  }

  $window.value.setAttribute('id', dialogId)
})

let activeElement: HTMLElement | null = null

watch(
  () => props.isOpen,
  value => {
    if (!import.meta.client) {
      return
    }

    if (value) {
      activeElement = document?.activeElement as HTMLElement
      setTimeout(() => {
        $focusGuard.value?.focus()
      }, 300)
    } else {
      setTimeout(() => {
        activeElement?.focus()
      }, 300)
    }
  }
)

watch(
  () => props.isOpen,
  () => {
    if (props.isOpen) {
      isActualOpen.value = props.isOpen
    } else {
      setTimeout(() => {
        isActualOpen.value = props.isOpen
      }, props.duration * 1000)
    }

    setTimeout(() => {
      $window.value?.classList.toggle('is-open', props.isOpen)
    }, 1)
  }
)
</script>

<template>
  <Transition :name="transitionName">
    <div
      v-show="isActualOpen"
      :data-open="isOpen"
      ref="$el"
      role="dialog"
      :aria-modal="true"
      @keydown.esc="emit('close')"
      v-bind="$attrs"
    >
      <button
        ref="$modalFocusGuard"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 1px;
          opacity: 0;
        "
      ></button>
      <slot />
    </div>
  </Transition>
</template>
