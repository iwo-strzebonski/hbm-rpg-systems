<script setup lang="ts">
import {
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

function handleRollDice(skillId: number) {
  $emit('rollDice', skillId)
}
</script>

<template>
  <fwb-table class="flowbite rounded-lg mt-4" hoverable>
    <fwb-table-head>
      <fwb-table-head-cell>Umiejętność</fwb-table-head-cell>
      <fwb-table-head-cell>Atrybut</fwb-table-head-cell>
      <fwb-table-head-cell>Wartość (z Atrybutem)</fwb-table-head-cell>
      <fwb-table-head-cell>
        <span class="sr-only">Rzut</span>
      </fwb-table-head-cell>
    </fwb-table-head>

    <fwb-table-body>
      <fwb-table-row v-for="({ key, value, customData }, id) in $props.characterInfo['skills']" :key="key">
        <fwb-table-head-cell>{{ key }}</fwb-table-head-cell>

        <fwb-table-cell>
          <!-- eslint-disable-next-line vue/no-mutating-props -->
          <select v-model="$props.characterInfo['skills'][id].customData" class="dark:bg-zinc-700">
            <option v-for="{ key: k } in $props.characterInfo['attributes']" :key="k" :value="k">
              {{ k }}
            </option>
          </select>
        </fwb-table-cell>

        <fwb-table-cell>
          {{ value }}
          <b class="text-lg"
            >(
            {{ calculateSkillValueWithAttribute(value, customData as string, $props.characterInfo) }}
            )</b
          >
        </fwb-table-cell>

        <fwb-table-cell>
          <fwb-button class="flowbite" color="default" size="sm" @click="handleRollDice(id)"> Rzut </fwb-button>
        </fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>
</template>
