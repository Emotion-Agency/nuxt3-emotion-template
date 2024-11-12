<script setup lang="ts"></script>

<template>
  <main>
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
  </main>
</template>
