<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
import { initFlowbite } from 'flowbite'

const { $pwa } = useNuxtApp()

onMounted(() => {
  if ($pwa?.offlineReady) {
    alert('App ready to work offline')
  }

  // $pwa.update()
})

onBeforeMount(() => {
  initFlowbite()
})
</script>

<template>
  <div>
    <SpeedInsights />

    <VitePwaManifest />

    <NuxtPage />
  </div>
</template>
