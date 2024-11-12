<script lang="ts" setup>
const checked = ref(false)
</script>

<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInputLabel for="checkbox">Checkbox</HeadlessInputLabel>
    <HeadlessInputCheckbox
      id="checkbox"
      name="checkbox"
      v-model="checked"
      :required="true"
    />
    <HeadlessInputValidationMessage v-if="field.error">
      this field is required
    </HeadlessInputValidationMessage>
  </HeadlessInputField>
</template>
