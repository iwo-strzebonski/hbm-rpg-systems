<script setup lang="ts">
import { FwbSpinner } from 'flowbite-vue'
import XLSX from 'xlsx'

import { TEAMS, DOCUMENTS } from '~/settings/constants'
import { type DocumentFile } from '~/utils/findEntryInDocument'
import parseCharacterData from '~/utils/parseCharacterData'

import type { CharacterInfo } from '~/types'

const isShowModal = ref(false)
const selectedId = ref('')
const workbook = ref<XLSX.WorkBook | null>(null)
const selectedCharacter = ref<string>('')
const chosenSkill = ref<string>('')
const rollResult = ref<{ results: number[]; sum: number }>({ results: [], sum: 0 })

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

const characters = computed(() => {
  if (!workbook.value) {
    return []
  }

  return workbook.value.SheetNames.filter((name) => !(name.toLowerCase().includes('template') || name.startsWith('_')))
})

const worksheet = computed(() => {
  if (!(workbook.value && characters.value.length)) {
    return null
  }

  return workbook.value.Sheets[selectedCharacter.value]
})

const characterInfo = ref<CharacterInfo>({
  'base-info': [],
  'attributes': [],
  'skills': [],
  'talents': []
})

function closeModal() {
  isShowModal.value = false
  chosenSkill.value = ''
}

function handleRollDice(skillId: number) {
  const skill = characterInfo.value.skills[skillId]
  const diceAmount = calculateSkillValueWithAttribute(skill.value, skill.customData as string, characterInfo.value)

  const { results, sum } = rollDice(diceAmount)
  chosenSkill.value = skill.key

  console.info(`Wynik rzutu: ${sum} (${results.join(', ')})`)

  rollResult.value = {
    results,
    sum
  }

  isShowModal.value = true
}

watch(selectedId, async () => {
  workbook.value = null

  if (!selectedId.value) {
    return
  }

  try {
    workbook.value = await $fetch<XLSX.WorkBook>(`/api/characters/${selectedId.value}`)
  } catch (e) {
    console.error(e)
  }
})

watch(selectedCharacter, () => {
  characterInfo.value = {
    'base-info': [],
    'attributes': [],
    'skills': [],
    'talents': []
  }

  if (!selectedCharacter.value) {
    return
  }

  if (!worksheet.value) {
    return
  }

  characterInfo.value = parseCharacterData(worksheet.value)
})
</script>

<template>
  <NuxtLayout>
    <header class="w-full p-4 dark:bg-zinc-800">
      <h1 class="text-4xl mb-0">Karta Postaci</h1>
      <h2 class="text-2xl">HbM: RPG v3.0</h2>

      <span class="inline-block mt-4 text-xs italic">Kompatybilne z Kartami Postaci 2.0</span>
    </header>

    <main class="container mx-auto px-4 mt-4">
      <div class="w-full flex flex-col xs:flex-row justify-between items-center gap-2">
        <label for="team">Drużyna</label>

        <select v-model="selectedId" name="team" class="dark:bg-zinc-700">
          <option selected disabled value="">Wybierz drużynę...</option>
          <option v-for="team in TEAMS" :key="team.name" :value="team.sheetId">
            {{ team.name }}
          </option>
        </select>
      </div>

      <div v-if="selectedId" class="w-full flex flex-col xs:flex-row justify-between items-center mt-4 gap-2">
        <label for="character">Postać</label>

        <fwb-spinner v-if="!characters.length" size="12" />

        <select v-else v-model="selectedCharacter" name="character" class="dark:bg-zinc-700">
          <option selected disabled value="">Wybierz postać...</option>
          <option v-for="character in characters" :key="character" :value="character">
            {{ character }}
          </option>
        </select>
      </div>

      <div class="w-full flex flex-col md:flex-row justify-between items-start mt-4 gap-4">
        <div class="w-full md:w-1/2">
          <character-details-table v-if="characterInfo" :character-info="characterInfo" />
        </div>

        <div class="w-full md:w-1/2">
          <character-attributes-table v-if="characterInfo" :character-info="characterInfo" />
        </div>
      </div>

      <character-talents-card
        v-if="characterInfo && documentFiles"
        :character-info="characterInfo"
        :document-files="documentFiles"
      />

      <character-skills-table
        v-if="characterInfo"
        :character-info="characterInfo"
        @roll-dice="handleRollDice($event)"
      />

      <div class="my-4">
        <h3>RAW</h3>
        <pre class="text-xs">{{ characterInfo }}</pre>
      </div>
    </main>

    <div>
      {{ documentFiles?.find((file) => file.name === 'Podręcznik Gry')?.data!.slice(50000, 100000) }}
    </div>

    <roll-result-modal
      :is-show-modal="isShowModal"
      :results="rollResult.results"
      :sum="rollResult.sum"
      :chosen-skill="chosenSkill"
      @close="closeModal"
    />
  </NuxtLayout>
</template>
