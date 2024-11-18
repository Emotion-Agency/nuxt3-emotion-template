<script setup lang="ts">
import { useSelect } from '~/composables/headless/select'
import type {
  IOption,
  ISelect,
  ISelectOption,
  TSelectEmits,
} from '~/types/headless/input'

const props = withDefaults(defineProps<ISelect>(), {
  as: 'div',
})

const emit = defineEmits<TSelectEmits>()

const model = defineModel<IOption[]>()

const {
  error,
  $selectContainer,
  isOpen,
  options,
  toggleDropdown,
  selectOption,
} = useSelect(props, emit, model)

provide('registerOption', (option: ISelectOption) => {
  // @ts-ignore
  options.push(option)
})

provide('selectOption', selectOption)
provide('selectedOption', model)
provide('isOpen', isOpen)

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isOpen.value = false
  }

  if (event.key === 'Enter') {
    event.preventDefault()
    // selectOption(model.value)
    isOpen.value = !isOpen.value
  }

  if (event.key === 'Tab') {
    isOpen.value = false
  }

  if (event.key === ' ') {
    event.preventDefault()
    isOpen.value = !isOpen.value
  }
}
defineExpose({
  toggleDropdown,
})
</script>

<template>
  <component
    :is="as"
    data-select
    tabindex="0"
    ref="$selectContainer"
    role="combobox"
    :aria-expanded="isOpen"
    :disabled="disabled"
    @click="toggleDropdown"
    @keydown="handleKeydown"
  >
    <slot />
  </component>
</template>
