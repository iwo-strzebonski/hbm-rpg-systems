<script setup lang="ts">
import {
  FwbAccordion,
  FwbAccordionHeader,
  FwbAccordionPanel,
  FwbAccordionContent,
  FwbTable,
  FwbTableHeadCell,
  FwbTableBody,
  FwbTableRow,
  FwbTableCell
} from 'flowbite-vue'

import useCampaignStore from '~/store/campaign.store'

const campaignStore = useCampaignStore()

const magicLevel = computed(() => {
  return campaignStore.characterInfo?.attributes.find((attr) => attr.key === 'Magia')?.customData || ''
})
</script>

<template>
  <lazy-client-only>
    <fwb-accordion class="flowbite custom-accordion">
      <fwb-accordion-panel v-if="campaignStore.characterInfo">
        <fwb-accordion-header class="custom-header"> Dane Osobowe </fwb-accordion-header>

        <fwb-accordion-content class="custom-content [&>*]:p-0">
          <fwb-table class="flowbite custom-table" hoverable>
            <fwb-table-body>
              <fwb-table-row v-for="{ key, value } in campaignStore.characterInfo['base-info']" :key="key">
                <fwb-table-head-cell>{{ key }}</fwb-table-head-cell>
                <fwb-table-cell>{{ value }}</fwb-table-cell>
              </fwb-table-row>

              <fwb-table-row>
                <fwb-table-head-cell>Poziom Mocy</fwb-table-head-cell>
                <fwb-table-cell>{{ magicLevel || '0' }}</fwb-table-cell>
              </fwb-table-row>

              <fwb-table-row v-for="{ key, value } in campaignStore.characterInfo['eldritch']" :key="key">
                <fwb-table-head-cell>{{ key }}</fwb-table-head-cell>
                <fwb-table-cell>{{ key === 'Choroby Psychiczne' && !value ? '-' : value }}</fwb-table-cell>
              </fwb-table-row>
            </fwb-table-body>
          </fwb-table>
        </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </lazy-client-only>
</template>
