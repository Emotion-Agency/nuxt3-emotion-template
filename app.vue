<script setup lang="ts">
import { useFonts } from '~/composables/fonts'

useFonts()

onMounted(async () => {
  const { hello } = await import('~/utils/hello')
  const { detectOrientationChanges } = await import(
    '~/utils/detectLandscapeOrientation'
  )

  detectOrientationChanges()
  hello()
})

useHead({
  htmlAttrs: {
    lang: 'en',
    id: 'scroll-container',
  },
})

const { toast } = useToasts()

onMounted(() => {
  toast.success('Welcome to Emotion template!')
})
</script>

<template>
  <div id="app">
    <Head>
      <Title>Emotion</Title>
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></Meta>
      <Link rel="icon" type="image/x-icon" href="/favicon.ico"></Link>
    </Head>
    <AppGrid />
    <Landscape />
    <SmoothScroll>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </SmoothScroll>
    <ToastGroup />
  </div>
</template>
