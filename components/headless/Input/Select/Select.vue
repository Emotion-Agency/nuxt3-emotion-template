<script setup lang="ts">
import { useInputContext } from '~/composables/headless/inputContext'
import type {
  IOption,
  ISelect,
  ISelectOption,
  TSelectEmits,
} from '~/types/headless/input'

const props = withDefaults(defineProps<ISelect>(), {
  placeholder: 'Select an option',
  modelValue: null,
  as: 'div',
})

const emit = defineEmits<TSelectEmits>()

const inputCtx = useInputContext()

if (inputCtx) {
  inputCtx.value = { ...inputCtx.value, ...props }
}

const isOpen = ref(false)
const options = reactive([])
const selectedOption = ref<IOption>(null)
const error = ref<boolean | string>(false)

const $selectContainer = ref(null)

provide('registerOption', (option: ISelectOption) => {
  options.push(option)
})
provide('selectOption', selectOption)
provide('selectedOption', selectedOption)
provide('isOpen', isOpen)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

const validate = () => {
  if (props.validators) {
    const value = selectedOption.value.value
    const falsyValidator = props.validators.find(validator => validator(value))

    if (falsyValidator) {
      error.value = falsyValidator(value)
      emit('error', error.value as string)
    } else {
      error.value = false
    }
  }
}

watch(
  () => props.modelValue,
  item => {
    const option = options.find(option => option.value === item?.value)

    if (option) {
      selectedOption.value = option
    } else {
      selectedOption.value = null
    }
  }
)

function selectOption(option: IOption) {
  selectedOption.value = option

  validate()

  emit('update:modelValue', {
    value: option.value,
    label: option.label,
    id: props.id,
    error: !!error.value,
  })

  if (inputCtx) {
    inputCtx.value = {
      ...inputCtx.value,
      value: option,
      error: error.value,
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

function handleOutsideClick(event: MouseEvent) {
  if (!$selectContainer.value.contains(event.target)) {
    isOpen.value = false
  }
}
</script>

<template>
  <component
    :is="as"
    data-select
    @click="toggleDropdown"
    tabindex="0"
    ref="$selectContainer"
    role="combobox"
    :aria-expanded="isOpen"
  >
    <slot />
  </component>
</template>
