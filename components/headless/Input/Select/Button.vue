<script lang="ts" setup>
interface IProps {
  withSearch?: boolean
  placeholder?: string
  modelValue?: string | null
}

const props = defineProps<IProps>()

const emit = defineEmits(['update:modelValue'])

const onChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<template>
  <div v-if="!withSearch" v-bind="$attrs">
    <slot />
  </div>

  <input
    v-bind="$attrs"
    v-if="withSearch"
    data-placeholder
    type="text"
    :value="modelValue"
    @input="onChange"
    :placeholder="placeholder"
  />
</template>
