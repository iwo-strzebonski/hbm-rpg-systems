<script setup lang="ts">
import { FwbButton, FwbModal } from 'flowbite-vue'

import getColorForRollResult from '~/utils/getColorForRollResult'

const $props = defineProps<{
  isShowModal: boolean
  results: number[]
  sum: number
  modalTitle: string
  testValue?: string
}>()

const $emit = defineEmits({
  close: () => true
})

const closeModal = () => {
  console.info(testData.value, $props.testValue)
  $emit('close')
}

const testData = computed(() => (!$props.testValue ? [0, 0] : $props.testValue.split(':').map((v) => parseInt(v))))
const missingSuccesses = computed(() => {
  if (!$props.testValue) return 0

  const successes = $props.results.reduce((v, c) => (v += +(c >= testData.value[0])), 0)

  console.info(successes, testData.value)

  return successes >= testData.value[1] ? 0 : testData.value[1] - successes
})
</script>

<template>
  <fwb-modal class="flowbite custom-modal" :class="{ hidden: !isShowModal }" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">
        Twój rzut na
        <span class="underline ml-1"
          >{{ $props.modalTitle }}<span v-if="testValue"> [{{ testValue }}]</span> </span
        >: <b class="ml-1">{{ $props.sum }}</b>

        <span v-if="testValue">
          &nbsp;-&nbsp;
          <span v-if="missingSuccesses === 0" class="underline !text-green-500">Sukces</span>
          <span v-else class="underline !text-red-500"> Porażka [{{ testData[1] - missingSuccesses }} sukces(y)] </span>
        </span>
      </div>
    </template>

    <template #body>
      <div class="inline-flex flex-wrap gap-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
        <span
          v-for="(result, i) in $props.results"
          :key="i"
          class="text-center block w-8 h-8 text-lg border"
          :class="getColorForRollResult(result, testData[0])"
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
