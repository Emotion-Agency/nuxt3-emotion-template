<script setup lang="ts">
import Tooltip from '~/components/headless/Tooltip.vue'
</script>

<template>
  <main style="max-width: 500px">
    <h1 class="22">Hello from Emotion!</h1>

    <HeadlessLoader />
    <ExamplesDialog />
    <ExamplesTabs />
    <ExamplesField />
    <ExamplesPasswordField />
    <HeadlessInputNumber
      style="min-width: 300px"
      :min="1"
      :max="10"
      id="number"
      placeholder="Number"
    />
    <ExamplesTextarea :rows="10" />
    <ExamplesCheckbox />
    <ExamplesSelect />
    <ExamplesDropdown />

    <Tooltip position="left">
      <template #trigger>
        <button>Hover or focus m</button>
      </template>
      Tooltip content
    </Tooltip>
  </main>
</template>
