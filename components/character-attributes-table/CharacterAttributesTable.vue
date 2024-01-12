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

import type { CharacterInfo } from '~/types'

const $props = defineProps<{
  characterInfo: CharacterInfo
}>()
</script>

<template>
  <lazy-client-only>
    <fwb-accordion class="flowbite custom-accordion">
      <fwb-accordion-panel>
        <fwb-accordion-header class="custom-header"> Atrybuty </fwb-accordion-header>

        <fwb-accordion-content class="custom-content [&>*]:p-0">
          <fwb-table class="flowbite custom-table" hoverable>
            <fwb-table-body>
              <fwb-table-row v-for="{ key, value } in $props.characterInfo['attributes']" :key="key">
                <fwb-table-head-cell>{{ key }}</fwb-table-head-cell>
                <fwb-table-cell>{{ value }}</fwb-table-cell>
              </fwb-table-row>
            </fwb-table-body>
          </fwb-table>
        </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </lazy-client-only>
</template>
