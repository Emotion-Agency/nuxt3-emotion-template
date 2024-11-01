<script lang="ts" setup>
interface IProps {
  transitionName?: string
}

withDefaults(defineProps<IProps>(), {
  transitionName: 'fade',
})
</script>

<template>
  <Transition :name="transitionName">
    <div tabindex="-1" role="document" data-dialog-window v-bind="$attrs">
      <slot />
    </div>
  </Transition>
</template>
