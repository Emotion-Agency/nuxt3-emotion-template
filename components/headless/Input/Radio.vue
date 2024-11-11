<script lang="ts" setup>
import { useCheckbox } from '~/composables/headless/checkbox'
import type { ICheckbox, TCheckboxEmits } from '~/types/headless/input'

const props = defineProps<ICheckbox>()

const emit = defineEmits<TCheckboxEmits>()

const { $input, checked, error, onBlur, onChange, onFocus, isFocused } =
  useCheckbox(props, emit)
</script>

<template>
  <input
    ref="$input"
    type="radio"
    data-radio
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
