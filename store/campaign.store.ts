import { defineStore } from 'pinia'
// @ts-expect-error - XLSX has no types declarations
import XLSX from 'xlsx'

import { TEAMS } from '~/settings/constants'

import type { Client } from 'appwrite'
import type { CharacterInfo, MessageDocument } from '~/types'

export default defineStore({
  id: 'campaign',
  state: () => ({
    party: '',
    character: '',
    workbook: null as XLSX.WorkBook | null,
    messages: [] as MessageDocument[],
    appwriteClient: null as Client | null
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

      return this.workbook?.Sheets[this.character] || null
    },
    characterInfo(): CharacterInfo | null {
      if (!this.worksheet) return null

      return parseCharacterData(this.worksheet)
    },
    partyMessages(): MessageDocument[] {
      return this.messages.filter((message) => message.party === this.party)
    }
  },
  actions: {
    async setWorkbook(party: string) {
      this.workbook = null

      try {
        this.workbook = await $fetch<XLSX.WorkBook>(`/api/characters/${party}`)
      } catch (e) {
        console.error(e)
      }
    }
  }
})
