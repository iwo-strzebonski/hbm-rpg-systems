export interface CharacterInfoRecord {
  key: string
  value: string
  customData?: string
  [key: string]: string | boolean | undefined
}

export default interface CharacterInfo {
  'base-info': CharacterInfoRecord[]
  'attributes': CharacterInfoRecord[]
  'talents': CharacterInfoRecord[]
  'skills': CharacterInfoRecord[]
  'spells': CharacterInfoRecord[]
}
