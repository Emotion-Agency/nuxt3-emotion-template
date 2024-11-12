<script setup lang="ts">
import type { IOption } from '~/types/headless/input'

const props = defineProps<IOption>()

const selectOption = inject('selectOption') as any
const registerOption = inject('registerOption') as any
const isOptionSelected = inject('isOptionSelected') as any

const isSelected = ref(false)
const optionRef = ref<HTMLElement>(null)

onMounted(() => {
  registerOption({ value: props.value, label: props.label, ref: optionRef })
  isSelected.value = isOptionSelected({ value: props.value })
})

function select() {
  selectOption({ value: props.value, label: props.label })
}

function setActive() {
  optionRef.value.focus()
}
</script>

<template>
  <div
    :class="['option', { selected: isSelected }]"
    data-option
    data-selected="false"
    @click="select"
    role="option"
    :aria-selected="isSelected"
    @mouseenter="setActive"
    ref="optionRef"
  >
    <slot :is-selected="isSelected"></slot>
  </div>
</template>
