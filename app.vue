<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
import { initFlowbite } from 'flowbite'

const { $pwa } = useNuxtApp()

onMounted(async () => {
  console.debug($pwa)

  if (!$pwa) {
    return
  }

  if ($pwa.offlineReady) {
    alert('App is ready to work offline')
  }

  if ($pwa.isInstalled) {
    // alert('App is installed')

    if ($pwa.needRefresh) {
      alert('App has update available')

      await $pwa.updateServiceWorker()
      await $pwa.install()
    }
  } else {
    // alert('App is not installed')

    $pwa.showInstallPrompt = true
    $pwa.install()
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

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
