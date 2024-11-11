<script lang="ts" setup>
import type { iInputData } from '~/types/headless/input'

const input = reactive({
  id: 'password',
  name: 'password',
  value: '',
  placeholder: 'Enter your password',
  required: true,
  error: true,
  validators: [Validation.min(6, 'At least 6 characters')],
})

const onInput = (data: iInputData) => {
  input.value = data.value
}

const isPasswordVisible = ref(false)
</script>

<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInputLabel>{{ input.name }}</HeadlessInputLabel>
    <div>
      <HeadlessInputPassword
        :is-password-visible="isPasswordVisible"
        :id="input.id"
        :name="input.name"
        :value="input.value"
        :placeholder="input.placeholder"
        :required="input.required"
        :validators="input.validators"
        @input="onInput"
      />
      <button @click="isPasswordVisible = !isPasswordVisible">
        {{ isPasswordVisible ? 'Hide' : 'Show' }}
      </button>
    </div>
    <HeadlessInputValidationMessage v-if="field.error">
      {{ field.error }}
    </HeadlessInputValidationMessage>
  </HeadlessInputField>
</template>
