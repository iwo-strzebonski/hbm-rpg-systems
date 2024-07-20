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
    documentId: '18zCp4lEnr5XMD3OvKIc4L5D1KSKo4-1WG9vinNzrOLw',
    embedUrl:
      'https://docs.google.com/document/d/e/2PACX-1vQFcZsK5GGg5Ok4cKgVu9xOzX3risaRcsx-9o0-B2wTmS9rfyXbXQpZIhpCKazXgYCwzAaMfRFAli0Z/pub?embedded=true'
  },
  {
    name: 'Księga Magii',
    documentId: '1lwOecWpr7NuMBeKIOfDaWS6PylPydUNHbm9R8tIMw9w',
    embedUrl:
      'https://docs.google.com/document/d/e/2PACX-1vRmRRAAimuzcedPY9-6276lpIS8YM_6dpA_k7rkHywtURxzl58ZZHePShQECNPgBH5kKfuirH0xsi6q/pub?embedded=true'
  },
  {
    name: 'Przewodnik Ludzkości po Magicznym Świecie',
    documentId: '1QyaDzQZIKUxMnEd02Y9AhR0rSmhY2szobUHrzSw2dIA',
    embedUrl:
      'https://docs.google.com/document/d/e/2PACX-1vSwOKvPWFAD1EDBg4g8yDu678K_OiD2TAltY9YpIfbe_YMBxSuldpwvbpBn15f3hu9E84arl9ROFgnP/pub?embedded=true'
  },
  {
    name: 'Klątwa Otchłani',
    documentId: '1jWotM0bwsJMqE6fg1-cC0nQserDEdAJLcV8OQxNORHg',
    embedUrl:
      'https://docs.google.com/document/d/e/2PACX-1vRQ1dFdJtNJ4xLFvBNFs6KN4Bg3Oci-Qu1Zhko1OoXJL_zU7dhvE97QjekErAAbi7En75di3CA9PfGf/pub?embedded=true'
  },
  {
    name: 'Chwała Szkarłatnemu Kultowi',
    documentId: '1i1fBZMutTLKO2CXHe8queAXMJ_6f5Yx3gKpHKoVq3m4',
    embedUrl:
      'https://docs.google.com/document/d/e/2PACX-1vSQpTUS-mtYWwTPrI1Pah5OQqLsmSiUVqBx5k-Cb8a13fEjHj2kdFp_Iy1wYzAR24VRpG-0yw80zNe5/pub?embedded=true'
  },
  {
    name: 'Krwawa Mgła',
    documentId: '1AsvkL3IzbD94hUw6sGeNtfKxQwO_yYp-avhkwpjGyio',
    embedUrl:
      'https://docs.google.com/document/d/e/2PACX-1vTyxSoC9RCUKfwYkkBIem9cpY_5EjBdu0Z_zzRZKB41QexeVE9cHODfrt_J0A5GbvhYDzUyePamYk8Y/pub?embedded=true'
  }
]

export const CELLS_TO_READ: Record<
  string,
  {
    range: string
    name: string
    value: string
    customData?: string
    cost?: string
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
    value: 'C',
    customData: 'D'
  },
  'talents': {
    range: 'B26:B62',
    name: 'B',
    value: 'B',
    customData: 'E'
  },
  'skills': {
    range: 'G27:V50',
    name: 'G',
    value: 'O',
    customData: 'H'
  },
  'spells': {
    range: 'B69:T88',
    name: 'B',
    value: 'B',
    customData: 'H',
    cost: 'D'
  },
  'stats': {
    range: 'F16:J20',
    name: 'F',
    value: 'I',
    customData: 'J'
  },
  'eldritch': {
    range: 'G56:I58',
    name: 'G',
    value: 'I'
  }
}
