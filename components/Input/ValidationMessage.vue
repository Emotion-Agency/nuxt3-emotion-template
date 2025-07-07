<template>
  <span data-validation-message class="input-validation">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.input-validation {
  color: var(--status-danger);
  display: block;
}
</style>
