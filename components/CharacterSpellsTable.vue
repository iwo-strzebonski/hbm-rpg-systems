<script setup lang="ts">
/* eslint-disable vue/no-mutating-props */

import {
  FwbAccordion,
  FwbAccordionHeader,
  FwbAccordionPanel,
  FwbAccordionContent,
  FwbTable,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableBody,
  FwbTableRow,
  FwbTableCell,
  FwbButton
} from 'flowbite-vue'

import { DOCUMENTS } from '~/settings/constants'
import calculateSkillValueWithAttribute from '~/utils/calculateSkillValueWithAttribute'

import type { CharacterInfo } from '~/types'

const $props = defineProps<{
  characterInfo: CharacterInfo
  documentFiles: DocumentFile[]
}>()

const $emit = defineEmits({
  castSpell: (_id: number, _amount: number, _test: string) => true
})

const spellbookId = DOCUMENTS.find((document) => document.name === 'Księga Magii')?.documentId

const isPriest = computed(() => {
  return $props.characterInfo.talents.findIndex((info) => info.key === 'Błogosławieństwo') !== -1
})

function calculateSpellDiceAmount(spellId: number) {
  const spell = $props.characterInfo.spells[spellId]
  const skill = $props.characterInfo.skills.find(
    (s) => s.key === (isPriest.value && spell.isPrayer ? 'Oddanie' : 'Zdolności Magiczne')
  )

  if (!skill) {
    return 0
  }

  const skillValue = calculateSkillValueWithAttribute(
    skill.value,
    isPriest.value && spell.isPrayer ? 'Dusza' : 'Magia',
    $props.characterInfo
  )

  return skillValue + parseInt(spell.customData as string)
}

function getTestValueForSpell(spellId: number): string {
  const desc = getSpellDescription(spellId)

  if (!desc) return '0:0'

  const { stats } = desc

  const re = /<li>.*?(?<testValue>\d:\d)<\/li>/

  const testValueMatch = stats.match(re)

  if (!testValueMatch?.groups?.testValue) {
    return '0:0'
  }

  return testValueMatch.groups.testValue
}

function handleRollDice(spellId: number) {
  $emit('castSpell', spellId, calculateSpellDiceAmount(spellId), getTestValueForSpell(spellId))
}

function getSpellDescription(spellId: number) {
  const spell = $props.characterInfo.spells[spellId]

  if (!spell) {
    return null
  }

  const spellInfo = findEntryInDocument($props.documentFiles, 'Księga Magii', spell.key, EntryTypeEnum.SPELL)

  if (!spellInfo) {
    return null
  }

  return spellInfo as {
    id: string
    stats: string
    description: string
  }
}

function toggleDescription(spellId: number) {
  const spell = $props.characterInfo.spells[spellId]

  if (!spell) {
    return
  }

  spell.isDescriptionOpen = !spell.isDescriptionOpen
}
</script>

<template>
  <lazy-client-only>
    <fwb-accordion class="flowbite custom-accordion w-full lg:w-1/2">
      <fwb-accordion-panel>
        <fwb-accordion-header class="custom-header"> Zaklęcia </fwb-accordion-header>

        <fwb-accordion-content class="custom-content [&>*]:p-0 overflow-auto max-h-[calc(100vh_-_66px)]">
          <fwb-table class="flowbite custom-table" hoverable>
            <fwb-table-head>
              <fwb-table-head-cell>Nazwa</fwb-table-head-cell>
              <fwb-table-head-cell>Koszt Many</fwb-table-head-cell>
              <fwb-table-head-cell v-if="isPriest">Modlitwa?</fwb-table-head-cell>
              <fwb-table-head-cell>Bonus</fwb-table-head-cell>
              <fwb-table-head-cell>Ilość kości</fwb-table-head-cell>
              <fwb-table-head-cell>
                <span class="sr-only">Rzut</span>
              </fwb-table-head-cell>
            </fwb-table-head>

            <fwb-table-body>
              <template v-for="({ key, isDescriptionOpen }, i) in $props.characterInfo['spells']" :key="key">
                <fwb-table-row>
                  <fwb-table-head-cell>
                    <fwb-button color="purple" class="h-full w-full" @click="toggleDescription(i)">
                      {{ key }}
                    </fwb-button>
                  </fwb-table-head-cell>

                  <fwb-table-cell>
                    {{ $props.characterInfo['spells'][i].cost }}
                  </fwb-table-cell>

                  <fwb-table-cell v-if="isPriest" class="text-center">
                    <input
                      v-model="$props.characterInfo['spells'][i].isPrayer"
                      type="checkbox"
                      class="dark:bg-zinc-700"
                    />
                  </fwb-table-cell>

                  <fwb-table-cell>
                    <input
                      v-model="$props.characterInfo['spells'][i].customData"
                      step="1"
                      min="-10"
                      max="10"
                      type="number"
                      class="dark:bg-zinc-700"
                    />
                  </fwb-table-cell>

                  <fwb-table-cell>
                    {{ calculateSpellDiceAmount(i) }}
                  </fwb-table-cell>

                  <fwb-table-cell>
                    <fwb-button class="flowbite" color="default" size="sm" @click="handleRollDice(i)">
                      Rzut
                    </fwb-button>
                  </fwb-table-cell>
                </fwb-table-row>

                <fwb-table-row v-show="isDescriptionOpen" v-if="getSpellDescription(i)">
                  <fwb-table-cell
                    colspan="5"
                    class="text-left text-base bg-white dark:!bg-zinc-900 w-[calc(100%_-_6rem)]"
                  >
                    <p class="text-left ml-4 [&>*]:list-disc" v-html="getSpellDescription(i)?.stats"></p>

                    <p
                      class="text-left text-sm flex flex-col mt-4 gap-2 [&>*]:break-word whitespace-normal"
                      v-html="getSpellDescription(i)?.description"
                    ></p>

                    <nuxt-link
                      class="float-left mt-2 font-semibold hover:underline text-blue-500 dark:text-blue-400 text-lg"
                      :to="`https://docs.google.com/document/d/${spellbookId}#heading=h.${getSpellDescription(i)?.id}`"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </nuxt-link>
                  </fwb-table-cell>
                </fwb-table-row>
              </template>
            </fwb-table-body>
          </fwb-table>
        </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </lazy-client-only>
</template>
