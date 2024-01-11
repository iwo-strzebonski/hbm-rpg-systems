<script setup lang="ts">
import { FwbButton, FwbModal } from 'flowbite-vue'

import getColorForRollResult from '~/utils/getColorForRollResult'

const $props = defineProps<{
  isShowModal: boolean
  results: number[]
  sum: number
  chosenSkill: string
}>()

const $emit = defineEmits({
  close: () => true
})

const closeModal = () => {
  $emit('close')
}
</script>

<template>
  <fwb-modal class="flowbite custom-modal" :class="{ hidden: !isShowModal }" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">
        Twój rzut na <span class="underline ml-1">{{ $props.chosenSkill }}</span
        >: <b class="ml-1">{{ $props.sum }}</b>
      </div>
    </template>

    <template #body>
      <div class="inline-flex flex-wrap gap-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span
          v-for="result in $props.results"
          :key="result"
          class="text-center block w-8 h-8 text-lg border"
          :class="getColorForRollResult(result)"
        >
          {{ result }}
        </span>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between">
        <fwb-button color="green" @click="closeModal"> OK </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
