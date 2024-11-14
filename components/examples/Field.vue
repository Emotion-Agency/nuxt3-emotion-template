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

// const inputValue = ref('')

const onInput = (data: iInputData) => {
  // input.value = data.value
  console.log(data)
}
</script>

<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInputLabel>{{ input.name }}</HeadlessInputLabel>
    <HeadlessInput
      :id="input.id"
      :name="input.name"
      :type="input.type"
      v-model="input.value"
      :placeholder="input.placeholder"
      :required="input.required"
      :validators="input.validators"
      @input="onInput"
    />
    <HeadlessInputValidationMessage
      class="validation-message"
      v-if="field.error"
    >
      {{ field.error }}
    </HeadlessInputValidationMessage>
  </HeadlessInputField>
</template>

<style lang="scss">
input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 1rem;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;

  &:focus {
    border-color: #1976d2;
    box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.2);
  }
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.validation-message {
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 4px;
}
</style>
