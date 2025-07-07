<script lang="ts" setup>
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
  type NumberFieldRootProps,
} from 'reka-ui'
import type { IInput } from '~/types/input'

const props = withDefaults(
  defineProps<
    IInput &
      NumberFieldRootProps & {
        buttons?: boolean
      }
  >(),
  {
    buttons: true,
  }
)

const model = defineModel<number>()

const uniqId = useId()

const inputId = computed(() => {
  return props.id || `input-${uniqId}`
})
</script>

<template>
  <div class="field">
    <InputFieldLabel :id="inputId" :description :label :required="required" />

    <NumberFieldRoot
      :id="inputId"
      v-model="model"
      :min="min"
      :max="max"
      :step="step"
      :step-snapping="false"
      :format-options="formatOptions"
      class="field__control"
      :class="{
        'field__control--number': buttons,
      }"
    >
      <NumberFieldDecrement v-if="buttons">
        <Icon name="lucide:minus" />
      </NumberFieldDecrement>
      <NumberFieldInput class="input" />
      <NumberFieldIncrement v-if="buttons">
        <Icon name="lucide:plus" />
      </NumberFieldIncrement>
    </NumberFieldRoot>
    <template v-if="errors?.length">
      <InputValidationMessage
        v-for="error in errors"
        :id="`err-${inputId}`"
        :key="error.$uid"
      >
        {{ error.$message }}
      </InputValidationMessage>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.input {
  all: unset;
  appearance: none;
  border: none;
  outline: none;
  padding: rem(8) rem(12);
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: var(--foreground);

  &::placeholder {
    color: var(--foreground-muted);
  }
}
</style>
