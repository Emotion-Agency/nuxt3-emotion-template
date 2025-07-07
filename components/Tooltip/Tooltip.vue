<script setup lang="ts">
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
  type TooltipRootEmits,
  useForwardPropsEmits,
} from 'reka-ui'
import type { TooltipProps } from '~/types/tooltip'

const props = defineProps<TooltipProps>()
const emits = defineEmits<TooltipRootEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>

<template>
  <TooltipRoot v-bind="forward">
    <TooltipTrigger as-child>
      <slot name="trigger" />
    </TooltipTrigger>

    <Transition name="fade">
      <TooltipContent
        :side="side"
        class="tooltip-content-wrapper"
        :align="align"
        :side-offset="12"
        :align-offset="12"
      >
        <div class="tooltip-content">
          <slot />
        </div>
      </TooltipContent>
    </Transition>
  </TooltipRoot>
</template>

<style scoped lang="scss">
.tooltip-content {
  @include text-s;
  background: var(--backdrop);

  color: var(--primary-button-text);

  border-radius: var(--rounded-md);
  padding: var(--rounded-md);
}
</style>
