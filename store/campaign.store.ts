import { defineStore } from 'pinia'
// @ts-expect-error - XLSX has no types declarations
import XLSX from 'xlsx'

import { TEAMS } from '~/settings/constants'

import type { CharacterInfo } from '~/types'

export default defineStore({
  id: 'campaign',
  state: () => ({
    party: '',
    character: '',
    workbook: null as XLSX.WorkBook | null
  }),
  getters: {
    partyName(): string {
      return TEAMS.find((team) => team.sheetId === this.party)?.name || ''
    },
    characters(): string[] {
      if (!this.workbook) return []

      return this.workbook.SheetNames.filter(
        (name: string) => !(name.toLowerCase().includes('template') || name.startsWith('_'))
      )
    },
    worksheet(): XLSX.WorkSheet | null {
      if (!this.workbook && !this.character) return null

      return this.workbook.Sheets[this.character]
    },
    characterInfo(): CharacterInfo | null {
      if (!this.worksheet) return null

      return parseCharacterData(this.worksheet)
    }
  },
  actions: {
    async setWorkbook(party: string) {
      try {
        this.workbook = await $fetch<XLSX.WorkBook>(`/api/characters/${party}`)
      } catch (e) {
        console.error(e)
      }
    }
  }
})