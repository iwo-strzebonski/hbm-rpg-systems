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

const shownDescriptions = ref<boolean[]>([])
const arePrayers = ref<boolean[]>([])
const bonusDice = ref<number[]>([])
const diceAmounts = ref<number[]>([])

const $props = defineProps<{
  documentFiles: DocumentFile[]
}>()

const $emit = defineEmits({
  castSpell: (_id: number, _amount: number, _test: string) => true
})

const isPriest = computed(() => {
  if (!campaignStore.characterInfo) {
    return false
  }

  return campaignStore.characterInfo.talents.findIndex((info) => info.key === 'Błogosławieństwo') !== -1
})

const spells = ref<Record<string, string | boolean | number>[]>([])

function calculateSpellDiceAmount(spellId: number) {
  if (!campaignStore.characterInfo) {
    return 0
  }

  const skill = campaignStore.characterInfo.skills.find(
    (s) => s.key === (isPriest.value && arePrayers.value[spellId] ? 'Oddanie' : 'Zdolności Magiczne')
  )

  if (!skill) {
    return 0
  }

  const skillValue = calculateSkillValueWithAttribute(
    skill.value,
    isPriest.value && arePrayers.value[spellId] ? 'Dusza' : 'Magia',
    campaignStore.characterInfo
  )

  return skillValue + bonusDice.value[spellId]
}

function getTestValueForSpell(spellId: number): string {
  const desc = getSpellDescription(spellId)

  if (!desc) return '0:0'

  const { stats } = desc

  const re = /<li>.*?(?<testValue>\d:\d)<\/li>/

  if (!stats) {
    return '0:0'
  }

  const testValueMatch = stats.match(re)

  if (!testValueMatch?.groups?.testValue) {
    return '0:0'
  }

  return testValueMatch.groups.testValue
}

function handleRollDice(spellId: number) {
  $emit('castSpell', spellId, calculateSpellDiceAmount(spellId), getTestValueForSpell(spellId))
}

function getSpellDescription(spellId: number) {
  if (!campaignStore.characterInfo) {
    return null
  }

  const spell = campaignStore.characterInfo.spells[spellId]

  if (!spell) {
    return null
  }

  const spellInfo = findEntryInAnyDocument($props.documentFiles, spell.key, EntryTypeEnum.SPELL)

  if (!spellInfo) {
    return null
  }

  return spellInfo
}

function updateIsPrayer(spellId: number) {
  arePrayers.value[spellId] = !arePrayers.value[spellId]
  diceAmounts.value[spellId] = calculateSpellDiceAmount(spellId)
}

onMounted(() => {
  if (!campaignStore.characterInfo) {
    return
  }

  spells.value = campaignStore.characterInfo.spells.map((spell) => {
    const spellInfo = findEntryInAnyDocument($props.documentFiles, spell.key, EntryTypeEnum.SPELL)

    return {
      ...spell,
      ...spellInfo,
      isPrayer: spell.isPrayer || false
    }
  })

  shownDescriptions.value = Array(spells.value.length).fill(false)
  arePrayers.value = spells.value.map((spell) => Boolean(spell.isPrayer))
  bonusDice.value = spells.value.map((spell) => Number(spell.customData || 0))
  diceAmounts.value = spells.value.map((_, i) => calculateSpellDiceAmount(i))
})
</script>

<template>
  <lazy-client-only>
    <fwb-accordion class="flowbite custom-accordion w-full mt-4">
      <fwb-accordion-panel v-if="campaignStore.characterInfo">
        <fwb-accordion-header class="custom-header"> Zaklęcia </fwb-accordion-header>

        <fwb-accordion-content class="custom-content [&>*]:p-0 overflow-auto max-h-[calc(100vh_-_66px)]">
          <fwb-table class="flowbite custom-table" hoverable>
            <fwb-table-head>
              <fwb-table-head-cell>Nazwa</fwb-table-head-cell>
              <fwb-table-head-cell>Koszt Many</fwb-table-head-cell>
              <fwb-table-head-cell v-show="isPriest">Modlitwa?</fwb-table-head-cell>
              <fwb-table-head-cell>Bonus</fwb-table-head-cell>
              <fwb-table-head-cell>Ilość kości</fwb-table-head-cell>
              <fwb-table-head-cell>
                <span class="sr-only">Rzut</span>
              </fwb-table-head-cell>
            </fwb-table-head>

            <fwb-table-body>
              <template v-for="(spell, i) in spells" :key="spell.key">
                <fwb-table-row class="">
                  <fwb-table-head-cell>
                    <fwb-button
                      color="purple"
                      class="h-full w-full text-center"
                      @click="shownDescriptions[i] = !shownDescriptions[i]"
                    >
                      {{ spell.key }}
                    </fwb-button>
                  </fwb-table-head-cell>

                  <fwb-table-cell class="text-left">
                    {{ spell.cost }}
                  </fwb-table-cell>

                  <fwb-table-cell v-show="isPriest" class="text-center">
                    <input type="checkbox" class="dark:bg-zinc-700" @click="updateIsPrayer(i)" />
                  </fwb-table-cell>

                  <fwb-table-cell>
                    <input
                      v-model="bonusDice[i]"
                      step="1"
                      min="-10"
                      max="10"
                      type="number"
                      class="dark:bg-zinc-700"
                      @change="diceAmounts[i] = calculateSpellDiceAmount(i)"
                    />
                  </fwb-table-cell>

                  <fwb-table-cell>
                    {{ diceAmounts[i] }}
                  </fwb-table-cell>

                  <fwb-table-cell>
                    <fwb-button class="flowbite" color="default" size="sm" @click="handleRollDice(i)">
                      Rzut
                    </fwb-button>
                  </fwb-table-cell>
                </fwb-table-row>

                <fwb-table-row v-show="shownDescriptions[i]">
                  <fwb-table-cell
                    colspan="6"
                    class="text-left text-base bg-white dark:!bg-zinc-900 w-[calc(100%_-_6rem)]"
                  >
                    <p class="text-left ml-4 [&>*]:list-disc" v-html="spell.stats"></p>

                    <p
                      class="text-left text-sm flex flex-col mt-4 gap-2 [&>*]:break-word whitespace-normal"
                      v-html="spell.description"
                    ></p>

                    <nuxt-link
                      class="float-left mt-2 font-semibold hover:underline text-blue-500 dark:text-blue-400 text-lg"
                      :to="`https://docs.google.com/document/d/${spell.documentId}#heading=h.${spell.id}`"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </nuxt-link>
                  </fwb-table-cell>
                </fwb-table-row>
              </template>
            </fwb-table-body>
          </fwb-table>
        </fwb-accordion-content>
      </fwb-accordion-panel>
    </fwb-accordion>
  </lazy-client-only>
</template>
