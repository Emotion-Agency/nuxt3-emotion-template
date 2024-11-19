<script setup lang="ts">
import type { IOption } from '~/types/headless/input'

const props = defineProps<IOption>()

const selectOption = inject('selectOption') as any
const selectedOption = inject('selectedOption') as Ref<IOption | IOption[]>
const registerOption = inject('registerOption') as any

const isSelected = computed(() => {
  if (Array.isArray(selectedOption.value)) {
    return !!selectedOption.value?.find(opt => opt.value === props.value)
  }

  return selectedOption.value?.value === props.value
})

const optionRef = ref<HTMLElement>(null)

onMounted(() => {
  registerOption({ value: props.value, label: props.label, el: optionRef })
})

function select() {
  selectOption({ value: props.value, label: props.label })
}

function setActive() {
  optionRef.value.focus()
}
</script>

<template>
  <button
    ref="optionRef"
    data-option
    :data-selected="isSelected"
    role="option"
    :aria-selected="isSelected"
    :value="props.value"
    @click="select"
    @mouseenter="setActive"
  >
    <slot :is-selected="isSelected"></slot>
  </button>
</template>
