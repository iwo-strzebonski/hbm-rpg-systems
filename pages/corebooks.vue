<script setup>
import { FwbTab, FwbTabs } from 'flowbite-vue'

import { DOCUMENTS } from '~/settings/constants'

const activeTab = ref(DOCUMENTS[0].name)
</script>

<template>
  <div>
    <main class="container mx-auto px-4 mt-4">
      <lazy-client-only>
        <fwb-tabs v-model="activeTab" class="p-5">
          <fwb-tab
            v-for="document in DOCUMENTS"
            :key="document.documentId"
            :name="document.name"
            :title="document.name"
          >
            <iframe :src="document.embedUrl" :title="document.name" class="w-full h-[calc(100vh_-_300px)]"></iframe>
          </fwb-tab>
        </fwb-tabs>
      </lazy-client-only>
    </main>
  </div>
</template>
