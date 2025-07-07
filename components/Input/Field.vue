<script lang="ts" setup>
import type { IInput, TInputEmits } from '~/types/input'

const props = defineProps<IInput>()

const emit = defineEmits<TInputEmits>()

const slots = useSlots()

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
    <div class="field__control" @click="$input?.focus()">
      <div v-if="slots['start-icon']" class="field__icon field__start-icon">
        <slot name="start-icon" />
      </div>
      <input
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
        :class="{
          'input--start-icon': slots['start-icon'],
          'input--end-icon': slots['end-icon'],
        }"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @input="onInput"
      />
      <div v-if="slots['end-icon']" class="field__icon field__end-icon">
        <slot name="end-icon" />
      </div>
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
  appearance: none;
  border: none;
  outline: none;
  padding: rem(8) rem(12);
  width: 100%;
  height: 100%;
  background-color: transparent;
  color: var(--foreground);
  &--start-icon {
    padding-left: rem(36);
  }
  &--end-icon {
    padding-right: rem(36);
  }
  &::placeholder {
    color: var(--foreground-muted);
  }
}

.field__icon {
  color: var(--foreground-muted);
  position: absolute;
  top: calc(50% + rem(1));
  transform: translateY(-50%);
}

.field__start-icon {
  left: rem(12);
}
.field__end-icon {
  right: rem(12);
}
</style>
