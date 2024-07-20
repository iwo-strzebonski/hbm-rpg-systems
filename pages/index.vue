<script setup lang="ts">
import { Client } from 'appwrite'

import { APPWRITE_CONFIG, TEAMS } from '~/settings/constants'
import useCampaignStore from '~/store/campaign.store'

const campaignStore = useCampaignStore()

interface MessageDocument {
  $id: string
  party: string
  sender: string
  message: string
}

const data = ref<MessageDocument[]>([])
const disconnect = ref<() => void>()

onMounted(() => {
  const client = new Client().setEndpoint(APPWRITE_CONFIG.endpoint).setProject(APPWRITE_CONFIG.project)

  disconnect.value = client.subscribe(
    `databases.${APPWRITE_CONFIG.databaseId}.collections.${APPWRITE_CONFIG.collectionId}.documents`,
    (res) => {
      if (res.events.includes('databases.*.collections.*.documents.*.create')) {
        data.value.push(res.payload as MessageDocument)
      }
    }
  )
})

onUnmounted(() => {
  disconnect.value && disconnect.value()
})
</script>

<template>
  <main class="container mx-auto px-4 mt-4">
    <!-- {{ session }} -->
    <span v-if="campaignStore.partyName">
      Wybrana Drużyna: <span class="text-2xl">{{ campaignStore.partyName }}</span>
    </span>
    <br />
    <span v-if="campaignStore.character">
      Wybrana Postać: <span class="text-2xl">{{ campaignStore.character }}</span>
    </span>

    <h2 v-if="campaignStore.character" class="text-2xl mt-4">Historia rzutów i czat Work in Progress</h2>

    <ul
      v-if="campaignStore.partyName"
      class="mt-4 w-full text-xs py-2 px-4 border rounded-xl bg-zinc-50 dark:bg-zinc-950"
    >
      <li v-for="message in data" :key="message.$id">
        <span class="font-bold">[{{ TEAMS.find((team) => team.sheetId === message.party)?.name }}]</span>
        <span class="italic"> {{ ' ' }}{{ message.sender }} </span>:
        {{ message.message }}
      </li>
      <li v-if="!data.length">Brak wiadomości</li>
    </ul>
  </main>
</template>
