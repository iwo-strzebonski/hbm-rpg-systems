export const APP_TITLE = 'Homebrew Magic: RPG Systems'

export const TEAMS = [
  {
    name: 'Cień Otchłani nad Integrą',
    sheetId: '1IUncWaaAt4TPPMI2ynZONiC5bykJFWDcwtoipijWObA'
  },
  {
    name: 'AGH HbM',
    sheetId: '1O6YANVdbfDQAGsqs325RIxmf0z9qfOvyiuEZ0S-1o0A'
  }
]

export const DOCUMENTS = [
  {
    name: 'Podręcznik Gry',
    documentId: '18zCp4lEnr5XMD3OvKIc4L5D1KSKo4-1WG9vinNzrOLw'
  },
  {
    name: 'Księga Magii',
    documentId: '1lwOecWpr7NuMBeKIOfDaWS6PylPydUNHbm9R8tIMw9w'
  }
]

export const CELLS_TO_READ: Record<
  string,
  {
    range: string
    name: string
    attribute?: string
    value?: string
  }
> = {
  'base-info': {
    range: 'B5:C10',
    name: 'B',
    value: 'C'
  },
  'attributes': {
    range: 'B17:C20',
    name: 'B',
    value: 'C'
  },
  'talents': {
    range: 'B26:B62',
    name: 'B',
    value: 'B'
  },
  'skills': {
    range: 'G27:V50',
    name: 'G',
    attribute: 'H',
    value: 'O'
  }
}
