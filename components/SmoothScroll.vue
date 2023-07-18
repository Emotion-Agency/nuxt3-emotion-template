<script setup lang="ts">
onMounted(async () => {
  const { default: SmoothScroll } = await import(
    '@/assets/scripts/EmotionScroll'
  )
  const { raf } = await import('@emotionagency/utils')

  window.ss = new SmoothScroll({
    // breakpoint: 1000,
    saveScrollPosition: true,
    passive: false,
    friction: 0.07,
    stepSize: 0.9,
    raf,
  })

  // window.ss.on(args => {
  //   console.log(args)
  // })
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
