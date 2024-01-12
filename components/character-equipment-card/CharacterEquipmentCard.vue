<script setup lang="ts">
import { FwbAccordion, FwbAccordionPanel, FwbAccordionHeader, FwbAccordionContent } from 'flowbite-vue'
</script>

<template>
  <lazy-client-only>
    <fwb-accordion class="flowbite custom-accordion w-full md:w-1/2">
      <fwb-accordion-panel>
        <fwb-accordion-header class="custom-header"> Ekwipunek </fwb-accordion-header>

        <fwb-accordion-content class="custom-content"> Empty... </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </lazy-client-only>
</template>
