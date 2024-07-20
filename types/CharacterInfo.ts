export interface CharacterInfoRecord {
  key: string
  value: string
  customData?: string
  cost?: string
  [key: string]: string | boolean | undefined
}

export default interface CharacterInfo {
  'base-info': CharacterInfoRecord[]
  'attributes': CharacterInfoRecord[]
  'talents': CharacterInfoRecord[]
  'skills': CharacterInfoRecord[]
  'spells': CharacterInfoRecord[]
  'stats': CharacterInfoRecord[]
  'eldritch': CharacterInfoRecord[]
}
