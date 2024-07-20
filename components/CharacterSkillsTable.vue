<script setup lang="ts">
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

import useCampaignStore from '~/store/campaign.store'
import calculateSkillValueWithAttribute from '~/utils/calculateSkillValueWithAttribute'

const campaignStore = useCampaignStore()

const $emit = defineEmits({
  rollDice: (_: number, __: number) => true
})

function handleRollDice(skillId: number) {
  if (!campaignStore.characterInfo) {
    return
  }

  const skill = campaignStore.characterInfo.skills[skillId]

  if (!skill) {
    return
  }

  const skillValue = calculateSkillValueWithAttribute(
    skill.value,
    skill.customData as string,
    campaignStore.characterInfo
  )

  $emit('rollDice', skillId, skillValue)
}
</script>

<template>
  <lazy-client-only>
    <fwb-accordion class="flowbite custom-accordion mt-4">
      <fwb-accordion-panel v-if="campaignStore.characterInfo">
        <fwb-accordion-header class="custom-header"> Umiejętności </fwb-accordion-header>

        <fwb-accordion-content class="custom-content [&>*]:p-0 overflow-auto max-h-[calc(100vh_-_66px)]">
          <fwb-table class="flowbite custom-table" hoverable>
            <fwb-table-head>
              <fwb-table-head-cell>Umiejętność</fwb-table-head-cell>
              <fwb-table-head-cell>Atrybut</fwb-table-head-cell>
              <fwb-table-head-cell>Wartość (z Atrybutem)</fwb-table-head-cell>
              <fwb-table-head-cell>
                <span class="sr-only">Rzut</span>
              </fwb-table-head-cell>
            </fwb-table-head>

            <fwb-table-body>
              <fwb-table-row
                v-for="({ key, value, customData }, id) in campaignStore.characterInfo['skills']"
                :key="key"
              >
                <fwb-table-head-cell>{{ key }}</fwb-table-head-cell>

                <fwb-table-cell>
                  <!-- eslint-disable-next-line vue/no-mutating-props -->
                  <select v-model="campaignStore.characterInfo['skills'][id].customData" class="dark:bg-zinc-700">
                    <option v-for="{ key: k } in campaignStore.characterInfo['attributes']" :key="k" :value="k">
                      {{ k }}
                    </option>
                  </select>
                </fwb-table-cell>

                <fwb-table-cell>
                  {{ value }}
                  <b class="text-lg">
                    ({{ calculateSkillValueWithAttribute(value, customData as string, campaignStore.characterInfo) }})
                  </b>
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
