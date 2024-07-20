export interface DocumentFile {
  id: string
  name: string
  data: string
}

export enum EntryTypeEnum {
  TALENT = 'talent',
  SPELL = 'spell',
  SKILL = 'skill'
}

export const TalentGroups = ['id', 'name', 'requirements', 'description'] as const
export const SpellGroups = ['id', 'name', 'stats', 'description'] as const

export interface TalentEntry {
  id: string
  name: string
  description: string
  requirements?: string
  stats?: string
}

export default function findEntryInAnyDocument(
  documents: DocumentFile[],
  value: string,
  type: EntryTypeEnum
): null | (TalentEntry & { documentId: string }) {
  for (const document of documents) {
    const entry = findEntryInDocument(documents, document.name, value, type)

    if (entry) {
      return {
        ...entry,
        documentId: document.id
      }
    }
  }

  return null
}

export function findEntryInDocument(
  documents: DocumentFile[],
  documentTitle: string,
  value: string,
  type: EntryTypeEnum
): null | TalentEntry {
  const document = documents.find(({ name }) => name === documentTitle)?.data

  if (!document) throw new Error(`Document ${documentTitle} not found`)

  let regstr = ''

  switch (type) {
    case EntryTypeEnum.TALENT:
      // eslint-disable-next-line no-useless-escape
      regstr = `\<h[1-6]\>\<a id="_(?<id>.{10,12})"\>\<\/a\>(?<name>${value}.*?)\<\/h[1-6]\>(?<requirements>\<strong\>Wymagania: \<\/strong\>.*?)??(?<description>.*?)\<h[1-6]\>`
      break

    case EntryTypeEnum.SPELL:
      // eslint-disable-next-line no-useless-escape
      regstr = `\<h[1-6]\>\<a id=\"_(?<id>.{10,12})\"\>\<\/a\>(?<name>${value})\<\/h[1-6]\>(?<stats>\<ul\>.*?\<\/ul\>)(?<description>.*?)\<h[1-6]\>`
      break

    default:
      throw new Error(`Entry type ${type} not supported`)
  }

  const re = new RegExp(regstr, 'u')
  const entry = document.match(re)

  if (!entry) {
    return null

    // throw new Error(`Entry ${value} not found in document`)
  }

  return (entry.groups || null) as null | TalentEntry
}
