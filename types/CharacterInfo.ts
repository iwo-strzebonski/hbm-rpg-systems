export interface CharacterInfoRecord {
  key: string
  value: string
  customData?: string
}

export default interface CharacterInfo {
  'base-info': CharacterInfoRecord[]
  'attributes': CharacterInfoRecord[]
  'talents': CharacterInfoRecord[]
  'skills': CharacterInfoRecord[]
}
