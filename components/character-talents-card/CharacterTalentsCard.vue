<script setup lang="ts">
import { FwbCard, FwbAccordion, FwbAccordionPanel, FwbAccordionHeader, FwbAccordionContent } from 'flowbite-vue'

import { DOCUMENTS } from '~/settings/constants'
import { EntryTypeEnum, type DocumentFile } from '~/utils/findEntryInDocument'

import type { CharacterInfo } from '~/types'

const corebookId = DOCUMENTS.find((document) => document.name === 'Podręcznik Gry')?.documentId

const $props = defineProps<{
  characterInfo: CharacterInfo
  documentFiles: DocumentFile[]
}>()
</script>

<template>
  <fwb-card class="flowbite custom-card mt-4 !max-w-full !w-full">
    <label>Talenty</label>

    <lazy-client-only>
      <fwb-accordion v-if="$props.characterInfo" class="flowbite" always-open :open-first-item="false">
        <fwb-accordion-panel v-for="{ value } in $props.characterInfo['talents']" :key="value">
          <fwb-accordion-header class="[&>*]:!bg-zinc-800">
            {{ value }}
          </fwb-accordion-header>

          <fwb-accordion-content class="[&>*]:!bg-zinc-900">
            <div>
              <p
                v-if="
                  findEntryInDocument($props.documentFiles, 'Podręcznik Gry', value, EntryTypeEnum.TALENT)?.requirements
                "
                class="mb-2 text-zinc-500 dark:text-zinc-400"
                v-html="
                  findEntryInDocument($props.documentFiles, 'Podręcznik Gry', value, EntryTypeEnum.TALENT)?.requirements
                "
              ></p>

              <p
                class="text-zinc-500 dark:text-zinc-400 flex flex-col gap-2"
                v-html="
                  findEntryInDocument($props.documentFiles, 'Podręcznik Gry', value, EntryTypeEnum.TALENT)?.description
                "
              ></p>

              <nuxt-link
                class="mt-2 font-semibold hover:underline text-blue-500 dark:text-blue-400 text-lg"
                :to="`https://docs.google.com/document/d/${corebookId}#heading=h.${
                  findEntryInDocument($props.documentFiles, 'Podręcznik Gry', value, EntryTypeEnum.TALENT)?.id
                }`"
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </nuxt-link>
            </div>
          </fwb-accordion-content>
        </fwb-accordion-panel>
      </fwb-accordion>
    </lazy-client-only>
  </fwb-card>
</template>
