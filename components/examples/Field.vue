<script lang="ts" setup>
import type { iInputData } from '~/types/headless/input'

const input = reactive({
  id: 'name',
  name: 'name',
  type: 'text',
  value: '',
  placeholder: 'Enter your name',
  required: true,
  error: true,
  validators: [Validation.email('Please enter a valid email address')],
})

const onInput = (data: iInputData) => {
  input.value = data.value
}
</script>

<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInputLabel>{{ input.name }}</HeadlessInputLabel>
    <HeadlessInput
      :id="input.id"
      :name="input.name"
      :type="input.type"
      :value="input.value"
      :placeholder="input.placeholder"
      :required="input.required"
      :validators="input.validators"
      @input="onInput"
    />
    <HeadlessInputValidationMessage v-if="field.error">
      {{ field.error }}
    </HeadlessInputValidationMessage>
  </HeadlessInputField>
</template>
