<script setup lang="ts">
import { FwbTable, FwbTableHead, FwbTableHeadCell, FwbTableBody, FwbTableRow, FwbTableCell } from 'flowbite-vue'

import type { CharacterInfo } from '~/types'

const $props = defineProps<{
  characterInfo: CharacterInfo
}>()
</script>

<template>
  <fwb-table class="flowbite rounded-lg" hoverable>
    <fwb-table-head>
      <fwb-table-head-cell colspan="2"> Atrybuty </fwb-table-head-cell>
    </fwb-table-head>

    <fwb-table-body>
      <fwb-table-row v-for="{ key, value } in $props.characterInfo['attributes']" :key="key">
        <fwb-table-head-cell>{{ key }}</fwb-table-head-cell>
        <fwb-table-cell>{{ value }}</fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>
</template>
