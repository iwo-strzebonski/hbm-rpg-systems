<script setup lang="ts">
import { FwbSpinner } from 'flowbite-vue'

import { TEAMS, DOCUMENTS } from '~/settings/constants'
import useCampaignStore from '~/store/campaign.store'
import { type DocumentFile } from '~/utils/findEntryInAnyDocument'

import type { CharacterInfo } from '~/types'

enum DiceRollTypeEnum {
  SKILL = 'skills',
  SPELL = 'spells'
}

const campaignStore = useCampaignStore()

const isShowModal = ref(false)
const modalTitle = ref<string>('')
const rollResult = ref<{ results: number[]; sum: number }>({ results: [], sum: 0 })
const testValue = ref<string>('')
const displayRaw = ref(false)

const { data: documentFiles } = useLazyAsyncData<DocumentFile[]>(async () => {
  const files = await Promise.all(
    DOCUMENTS.map(async (document) => {
      const doc = await $fetch<string>(`/api/documents/${document.documentId}`)

      return {
        id: document.documentId,
        name: document.name,
        data: doc
      }
    })
  )

  return files
})

function closeModal() {
  isShowModal.value = false
  modalTitle.value = ''
}

function handleRollDice(skillOrSpellId: number, diceAmount: number, type: DiceRollTypeEnum, test = '') {
  if (!campaignStore.characterInfo) {
    return
  }

  const skillOrSpell = campaignStore.characterInfo[type as keyof CharacterInfo][skillOrSpellId]

  const { results, sum } = rollDice(diceAmount)
  modalTitle.value = skillOrSpell.key

  console.info(`Wynik rzutu: ${sum} (${results.join(', ')})`)

  rollResult.value = {
    results,
    sum
  }

  testValue.value = test

  isShowModal.value = true
}

watch(
  () => campaignStore.party,
  async (party) => {
    if (!party) {
      return
    }

    await campaignStore.setWorkbook(party)
  }
)
</script>

<template>
  <main class="container mx-auto px-4 mt-4">
    <div class="w-full flex flex-col xs:flex-row justify-between items-center gap-2">
      <label for="team">Drużyna</label>

      <select v-model="campaignStore.party" name="team" class="dark:bg-zinc-700">
        <option selected disabled value="">Wybierz drużynę...</option>
        <option v-for="team in TEAMS" :key="team.name" :value="team.sheetId">
          {{ team.name }}
        </option>
      </select>
    </div>

    <div v-if="campaignStore.party" class="w-full flex flex-col xs:flex-row justify-between items-center mt-4 gap-2">
      <label for="character">Postać</label>

      <fwb-spinner v-if="!campaignStore.characters.length" size="12" />

      <select v-else v-model="campaignStore.character" name="character" class="dark:bg-zinc-700">
        <option selected disabled value="">Wybierz postać...</option>
        <option v-for="character in campaignStore.characters" :key="character" :value="character">
          {{ character }}
        </option>
      </select>
    </div>

    <div class="w-full flex flex-col md:flex-row justify-between items-start mt-4 gap-4">
      <div class="w-full md:w-1/2">
        <CharacterDetailsTable v-if="campaignStore.characterInfo" />
      </div>

      <div class="w-full md:w-1/2 flex flex-col gap-4">
        <CharacterAttributesTable v-if="campaignStore.characterInfo" />
        <CharacterStatsTable v-if="campaignStore.characterInfo" />
      </div>
    </div>

    <CharacterTalentsCard v-if="documentFiles" :document-files="documentFiles" />

    <CharacterSkillsTable
      v-if="campaignStore.characterInfo"
      @roll-dice="(id, amount) => handleRollDice(id, amount, DiceRollTypeEnum.SKILL)"
    />

    <div class="flex gap-4 flex-col lg:flex-row mt-4">
      <CharacterSpellsTable
        v-if="campaignStore.characterInfo && documentFiles"
        :document-files="documentFiles"
        @cast-spell="(id, amount, test) => handleRollDice(id, amount, DiceRollTypeEnum.SPELL, test)"
      />

      <CharacterEquipmentCard v-if="campaignStore.characterInfo" />
    </div>

    <div class="my-4">
      <button class="inline-flex items-center gap-1" @click="displayRaw = !displayRaw">
        <h3>RAW</h3>
        <lazy-client-only>
          <fa-icon v-if="displayRaw" icon="caret-up" class="h-6 w-6 pb-1" />
          <fa-icon v-else icon="caret-down" class="h-6 w-6 pb-1" />
        </lazy-client-only>
      </button>

      <pre v-if="displayRaw" class="text-xs py-2 px-4 border rounded-xl bg-zinc-50 dark:bg-zinc-950">
          {{ campaignStore.characterInfo }}
        </pre
      >
    </div>

    <RollResultModal
      :is-show-modal="isShowModal"
      :results="rollResult.results"
      :sum="rollResult.sum"
      :modal-title="modalTitle"
      :test-value="testValue"
      @close="closeModal"
    />
  </main>
</template>
