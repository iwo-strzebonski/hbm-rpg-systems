<script setup lang="ts">
import { TEAMS } from '~/settings/constants'
import useCampaignStore from '~/store/campaign.store'

const campaignStore = useCampaignStore()
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

    <ul
      v-if="campaignStore.partyName"
      class="w-full h-[50vh] overflow-auto mt-4 text-xs py-2 px-4 border rounded-xl bg-zinc-50 dark:bg-zinc-950"
    >
      <li v-for="message in campaignStore.partyMessages" :key="message.$id" class="break-word whitespace-normal">
        <span class="font-bold">[{{ TEAMS.find((team) => team.sheetId === message.party)?.name }}]</span>
        <span class="italic"> {{ ' ' }}{{ message.sender }} </span>:
        {{ message.message }}
      </li>
      <li v-if="!campaignStore.partyMessages.length">Brak wiadomości</li>
    </ul>
  </main>
</template>
