<script setup lang="ts">
import EmotionScroll from '@/assets/scripts/EmotionScroll'
onMounted(async () => {
  const { raf } = await import('@emotionagency/utils')

  window.escroll = new EmotionScroll({
    // breakpoint: 1000,
    saveScrollPosition: true,
    passive: false,
    friction: 0.07,
    stepSize: 0.9,
    raf,
  })

  window.escroll.on(args => {
    console.log(args)
  })
})

onBeforeUnmount(() => {
  window.escroll && window.escroll.destroy()
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
