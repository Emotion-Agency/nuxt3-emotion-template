<script lang="ts" setup>
const checked = ref(false)
</script>

<template>
  <HeadlessInputField v-slot="field">
    <HeadlessInputLabel for="checkbox">Checkbox</HeadlessInputLabel>
    <HeadlessInputCheckbox
      id="checkbox"
      name="checkbox"
      :checked="checked"
      @change="console.log('checked:', $event)"
      :required="true"
    />
    <HeadlessInputValidationMessage v-if="field.error">
      this field is required
    </HeadlessInputValidationMessage>
  </HeadlessInputField>
</template>
