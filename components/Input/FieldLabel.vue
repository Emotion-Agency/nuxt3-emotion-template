<script lang="ts" setup>
import { Label } from 'reka-ui'

interface IProps {
  id: string
  label?: string
  description?: string
  required?: boolean
}

defineProps<IProps>()
</script>

<template>
  <div v-if="label || description" class="field-label-wrapper">
    <Label v-if="label" :for="id" class="field-label"
      >{{ label }}
      <abbr v-if="required" class="field-required-mark" aria-label="required"
        >*</abbr
      >
    </Label>
    <p v-if="description" class="field-description">{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.field-label {
  font-weight: medium;
}

.field-description {
  color: var(--foreground-muted);
}

.field-required-mark {
  color: var(--status-danger);
}
</style>
