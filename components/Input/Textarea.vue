<script lang="ts" setup>
import type { IInput, TInputEmits } from '~/types/input'

const props = defineProps<IInput>()

const emit = defineEmits<TInputEmits>()

const $input = useTemplateRef('input')

const model = defineModel<string>()

const uniqId = useId()

const inputId = computed(() => {
  return props.id || `input-${uniqId}`
})

const onInput = () => {
  emit('input', {
    value: model.value,
    id: inputId.value,
    error: false,
  })
}
</script>

<template>
  <div class="field">
    <InputFieldLabel :id="inputId" :description :label :required="required" />
    <div
      class="field__control field__control--textarea"
      @click="$input?.focus()"
    >
      <textarea
        :id="inputId"
        ref="input"
        v-model="model"
        :placeholder="placeholder"
        :name="name"
        :type="type"
        :aria-invalid="!!errors?.length"
        :aria-errormessage="`err-${inputId}`"
        :disabled="disabled"
        :auto-focus="autoFocus"
        :required="required"
        class="input"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @input="onInput"
      />
    </div>
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
  box-sizing: border-box;
  appearance: none;
  border: none;
  outline: none;
  resize: none;
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
