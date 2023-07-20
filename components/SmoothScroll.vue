<script setup lang="ts">
import EmotionScroll from '@emotionagency/emotion-scroll'
onMounted(async () => {
  const { raf } = await import('@emotionagency/utils')
  console.log(EmotionScroll)
  window.escroll = new EmotionScroll({
    // breakpoint: 1000,
    saveScrollPosition: true,
    passive: false,
    friction: 0.1,
    stepSize: 0.2,
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
