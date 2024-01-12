<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
import { initFlowbite } from 'flowbite'

const { $pwa } = useNuxtApp()

onMounted(() => {
  console.debug($pwa)

  if ($pwa?.offlineReady) {
    alert('App is ready to work offline')
  }

  if ($pwa?.isInstalled) {
    // alert('App is installed')

    if ($pwa?.needRefresh) {
      alert('App has update available')

      $pwa?.install()
    }
  } else {
    // alert('App is not installed')

    $pwa?.install()
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
