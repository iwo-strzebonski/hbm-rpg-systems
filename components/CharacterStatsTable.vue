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
  FwbInput
} from 'flowbite-vue'

import useCampaignStore from '~/store/campaign.store'

const campaignStore = useCampaignStore()

const characterCurrentStats = ref<Record<string, string>>(
  Object.fromEntries(campaignStore.characterInfo?.stats.map(({ key, customData }) => [key, customData || '0']) || [])
)

watch(
  () => campaignStore.characterInfo,
  () => {
    characterCurrentStats.value = Object.fromEntries(
      campaignStore.characterInfo?.stats.map(({ key, customData }) => [key, customData || '0']) || []
    )
  }
)
</script>

<template>
  <lazy-client-only>
    <fwb-accordion class="flowbite custom-accordion">
      <fwb-accordion-panel v-if="campaignStore.characterInfo">
        <fwb-accordion-header class="custom-header"> Cechy </fwb-accordion-header>

        <fwb-accordion-content class="custom-content [&>*]:p-0">
          <fwb-table class="flowbite custom-table" hoverable>
            <fwb-table-head>
              <fwb-table-head-cell>Cecha</fwb-table-head-cell>
              <fwb-table-head-cell>Wartość</fwb-table-head-cell>
              <fwb-table-head-cell>Obecna</fwb-table-head-cell>
            </fwb-table-head>

            <fwb-table-body>
              <fwb-table-row v-for="({ key, value }, i) in campaignStore.characterInfo['stats']" :key="key">
                <fwb-table-head-cell>{{ key }}</fwb-table-head-cell>
                <fwb-table-cell>{{ value }}</fwb-table-cell>
                <fwb-table-cell>
                  <fwb-input
                    v-if="'Inicjatywa' !== key"
                    v-model="campaignStore.characterInfo['stats'][i].customData"
                    type="number"
                  />
                </fwb-table-cell>
              </fwb-table-row>
            </fwb-table-body>
          </fwb-table>
        </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </lazy-client-only>
</template>
