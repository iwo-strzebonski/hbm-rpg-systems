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

import calculateSkillValueWithAttribute from '~/utils/calculateSkillValueWithAttribute'

import type { CharacterInfo } from '~/types'

const $props = defineProps<{
  characterInfo: CharacterInfo
}>()

const $emit = defineEmits({
  rollDice: (_: number) => true
})

const isPriest = computed(() => {
  return $props.characterInfo.talents.find((info) => info.key === 'Błogosławieństwo')
})

function calculateSpellDiceAmount(spellId: number) {
  const spell = $props.characterInfo.spells[spellId]
  const skill = $props.characterInfo.skills.find((s) =>
    s.key === isPriest.value && spell.isPrayer ? 'Oddanie' : 'Zdolności Magiczne'
  )

  if (!skill) {
    return 0
  }

  const skillValue = calculateSkillValueWithAttribute(
    skill.value,
    isPriest.value && spell.isPrayer ? 'Dusza' : 'Magia',
    $props.characterInfo
  )

  console.info(skillValue)

  return skillValue + spell.customData
}

function handleRollDice(spellId: number) {
  $emit('rollDice', spellId, calculateSpellDiceAmount(spellId))
}
</script>

<template>
  <lazy-client-only>
    <fwb-accordion class="flowbite custom-accordion mt-4">
      <fwb-accordion-panel>
        <fwb-accordion-header class="custom-header"> Zaklęcia </fwb-accordion-header>

        <fwb-accordion-content class="custom-content [&>*]:p-0 overflow-auto max-h-[calc(100vh_-_66px)]">
          <fwb-table class="flowbite custom-table relative" hoverable>
            <fwb-table-head>
              <fwb-table-head-cell>Nazwa</fwb-table-head-cell>
              <fwb-table-head-cell v-if="isPriest">Modlitwa?</fwb-table-head-cell>
              <fwb-table-head-cell>Bonus</fwb-table-head-cell>
              <fwb-table-head-cell>Ilość kości</fwb-table-head-cell>
              <fwb-table-head-cell>
                <span class="sr-only">Rzut</span>
              </fwb-table-head-cell>
            </fwb-table-head>

            <fwb-table-body>
              <fwb-table-row v-for="({ key }, id) in $props.characterInfo['spells']" :key="key">
                <fwb-table-head-cell>{{ key }}</fwb-table-head-cell>

                <fwb-table-cell v-if="isPriest" class="text-center">
                  <input
                    v-model="$props.characterInfo['spells'][id].isPrayer"
                    type="checkbox"
                    class="dark:bg-zinc-700"
                  />
                </fwb-table-cell>

                <fwb-table-cell>
                  <input
                    v-model="$props.characterInfo['spells'][id].customData"
                    step="1"
                    min="-10"
                    max="10"
                    type="number"
                    class="dark:bg-zinc-700"
                  />
                </fwb-table-cell>

                <fwb-table-cell>
                  {{ calculateSpellDiceAmount(id) }}
                </fwb-table-cell>

                <fwb-table-cell>
                  <fwb-button class="flowbite" color="default" size="sm" @click="handleRollDice(id)"> Rzut </fwb-button>
                </fwb-table-cell>
              </fwb-table-row>
            </fwb-table-body>
          </fwb-table>
        </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </lazy-client-only>
</template>
