<script lang="ts" setup>
import type { IInput, TInputEmits } from '~/types/input'

const props = withDefaults(defineProps<IInput>(), {
  type: 'text',
  placeholder: '',
})

const emit = defineEmits<TInputEmits>()

const {
  $input,
  error,
  inputValue,
  isFocused,
  onBlur,
  onChange,
  onFocus,
  reset,
} = useInput(props, emit)

defineExpose({
  reset,
  $input,
})
</script>

<template>
  <input
    ref="$input"
    data-input
    :data-focused="isFocused"
    :required="required"
    :id="id"
    :name="name"
    :type="type"
    :value="inputValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :autofocus="autoFocus"
    :aria-invalid="!!error"
    @input="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
