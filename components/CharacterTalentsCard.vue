<script setup lang="ts">
import { FwbAccordion, FwbAccordionPanel, FwbAccordionHeader, FwbAccordionContent } from 'flowbite-vue'

import useCampaignStore from '~/store/campaign.store'
import { EntryTypeEnum, type DocumentFile } from '~/utils/findEntryInAnyDocument'

const campaignStore = useCampaignStore()

const $props = defineProps<{
  documentFiles: DocumentFile[]
}>()

const uniqueTalents = computed(() => {
  const talents = campaignStore.characterInfo?.talents || []

  const ut: Record<string, TalentEntry & { documentId: string; count: number }> = {}

  for (const talent of talents) {
    const subtalent = talent.customData as string
    const key = talent.key + (subtalent && subtalent !== '---' ? ` (${subtalent})` : '')

    const talentData = findEntryInAnyDocument($props.documentFiles, key, EntryTypeEnum.TALENT)

    if (!talentData) {
      continue
    }

    ut[key] = key in ut ? { ...ut[key], count: ut[key].count + 1 } : { count: 1, ...talentData }
  }

  return ut
})
</script>

<template>
  <lazy-client-only>
    <fwb-accordion class="flowbite custom-accordion mt-4">
      <fwb-accordion-panel v-if="campaignStore.characterInfo">
        <fwb-accordion-header class="custom-header"> Talenty </fwb-accordion-header>

        <fwb-accordion-content class="custom-content [&>*]:p-0">
          <fwb-accordion
            v-if="Object.keys(uniqueTalents).length"
            class="custom-accordion flush"
            always-open
            flush
            :open-first-item="false"
          >
            <fwb-accordion-panel v-for="(talent, key) in uniqueTalents" :key="key">
              <fwb-accordion-header class="[&>*]:dark:!bg-zinc-800">
                {{ key }} <span v-if="talent.count > 1">(x{{ talent.count }})</span>
              </fwb-accordion-header>

              <fwb-accordion-content class="custom-content">
                <div>
                  <p
                    v-if="talent.requirements"
                    class="mb-2 text-zinc-500 dark:text-zinc-400"
                    v-html="talent.requirements"
                  ></p>

                  <p class="text-zinc-500 dark:text-zinc-400 flex flex-col gap-2" v-html="talent.description"></p>

                  <nuxt-link
                    class="mt-2 font-semibold hover:underline text-blue-500 dark:text-blue-400 text-lg"
                    :to="`https://docs.google.com/document/d/${talent.documentId}#heading=h.${talent.id}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </nuxt-link>
                </div>
              </fwb-accordion-content>
            </fwb-accordion-panel>
          </fwb-accordion>
        </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </lazy-client-only>
</template>
