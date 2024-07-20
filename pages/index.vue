<script setup lang="ts">
import useCampaignStore from '~/store/campaign.store'

const campaignStore = useCampaignStore()
// import { kv } from '@vercel/kv'
// await kv.hset('user_1', { session: 'user_1_session', test: 'aa' })
// const session = await kv.hgetall('user_1')
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

    <pre
      v-if="campaignStore.character"
      class="mt-4 w-full text-xs py-2 px-4 border rounded-xl bg-zinc-50 dark:bg-zinc-950"
    ></pre>
  </main>
</template>
