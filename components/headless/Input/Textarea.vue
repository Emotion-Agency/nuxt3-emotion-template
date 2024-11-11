<script lang="ts" setup>
import { useInput } from '~/composables/headless/input'
import type { IInput, TInputEmits } from '~/types/headless/input'

interface IProps extends IInput {
  rows?: number
  disableResize?: boolean
}

const props = defineProps<IProps>()

const emit = defineEmits<TInputEmits>()

const { $input, error, inputValue, isFocused, onBlur, onChange, onFocus } =
  useInput(props, emit)
</script>

<template>
  <textarea
    ref="$input"
    data-input
    data-textarea
    :data-focused="isFocused"
    :required="required"
    :id="id"
    :name="name"
    :value="inputValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :autofocus="autoFocus"
    :aria-invalid="!!error"
    :rows="rows"
    :style="`resize: ${disableResize ? 'none' : 'auto'}`"
    @input="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
