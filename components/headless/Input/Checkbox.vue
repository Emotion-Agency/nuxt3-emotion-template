<script lang="ts" setup>
import type { IInput } from '~/types/input'

interface IProps extends Omit<IInput, 'type' | 'placeholder' | 'validators'> {
  checked?: boolean
}

const props = defineProps<IProps>()

const isFocused = ref(false)

const inputCtx = useInputContext()

if (inputCtx) {
  inputCtx.value = { ...inputCtx.value, ...props }
}

const onFocus = () => {
  isFocused.value = true
}

const onBlur = () => {
  isFocused.value = false
}

const $input = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['change'])

const checked = ref(props.checked)

watch(
  () => props.checked,
  value => {
    checked.value = value
  }
)

const onChange = () => {
  emit('change', {
    id: props.id,
    checked: checked.value,
    error: error.value,
  })
}

const error = computed(() => {
  return props.required && !checked.value
})
</script>

<template>
  <input
    ref="$input"
    type="checkbox"
    data-checkbox
    :id="id"
    :name="name"
    :required="required"
    :data-focused="isFocused"
    :value="name"
    v-model="checked"
    :disabled="disabled"
    :autofocus="autoFocus"
    :aria-invalid="error"
    @focus="onFocus"
    @blur="onBlur"
    @change="onChange"
  />
</template>
