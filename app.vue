<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
import { Client } from 'appwrite'
import { initFlowbite } from 'flowbite'

import { APPWRITE_CONFIG } from '~/settings/constants'
import useCampaignStore from '~/store/campaign.store'

import type { MessageDocument } from './types'

const { $pwa } = useNuxtApp()

const campaignStore = useCampaignStore()

onMounted(async () => {
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

const disconnect = ref<() => void>()

onMounted(() => {
  campaignStore.appwriteClient = new Client().setEndpoint(APPWRITE_CONFIG.endpoint).setProject(APPWRITE_CONFIG.project)

  disconnect.value = campaignStore.appwriteClient.subscribe(
    `databases.${APPWRITE_CONFIG.databaseId}.collections.${APPWRITE_CONFIG.collectionId}.documents`,
    (res) => {
      if (res.events.includes('databases.*.collections.*.documents.*.create')) {
        campaignStore.messages.push(res.payload as MessageDocument)
      }
    }
  )
})

onUnmounted(() => {
  disconnect.value && disconnect.value()
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
