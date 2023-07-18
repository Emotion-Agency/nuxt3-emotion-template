<script setup lang="ts">
import EmotionScroll from '@/assets/scripts/EmotionScroll'
onMounted(async () => {
  const { raf } = await import('@emotionagency/utils')

  window.ss = new EmotionScroll({
    // breakpoint: 1000,
    saveScrollPosition: true,
    passive: false,
    friction: 0.07,
    stepSize: 0.9,
    raf,
  })

  window.ss.on(args => {
    console.log(args)
  })
})

onBeforeUnmount(() => {
  window.ss && window.ss.destroy()
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
