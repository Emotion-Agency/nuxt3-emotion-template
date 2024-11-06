<script lang="ts" setup>
import type { IInput } from '~/types/input'

interface IProps extends IInput {
  min: number
  max: number
  step?: number
}

const props = defineProps<IProps>()
</script>

<template>
  <HeadlessInput
    v-bind="props"
    type="number"
    :min="min"
    :max="max"
    :step="step"
  />
</template>
