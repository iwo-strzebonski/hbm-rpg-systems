import XLSX from 'xlsx'

import { CELLS_TO_READ } from '~/settings/constants'

import type { CharacterInfo } from '~/types'

export default function parseCharacterData(worksheet: XLSX.WorkSheet): CharacterInfo {
  const data: CharacterInfo = {
    'base-info': [],
    'attributes': [],
    'skills': [],
    'talents': [],
    'spells': [],
    'stats': [],
    'eldritch': []
  }

  for (const k in CELLS_TO_READ) {
    const {
      range: cellRange,
      name: nameColumn,
      value: valueColumn,
      customData: customDataColumn,
      cost: costColumn
    } = CELLS_TO_READ[k]

    const key = k as keyof CharacterInfo

    data[key] = []

    const { start, end } = parseCellPos<CellRange>(cellRange)

    const current = start.copy()

    while (parseInt(current.row) <= parseInt(end.row)) {
      const value = worksheet[current.toString()]

      if (!value) {
        current.nextRow()
        continue
      }

      if (value.v.startsWith('---')) {
        current.nextRow()
        continue
      }

      const customDataCell = customDataColumn && worksheet[`${customDataColumn}${current.row}`]
      const costCell = costColumn && worksheet[`${costColumn}${current.row}`]

      data[key].push({
        key: worksheet[`${nameColumn}${current.row}`].v,
        value: (worksheet[`${valueColumn}${current.row}`] || { v: '' }).v,
        customData: customDataCell ? customDataCell.v : 0,
        cost: costCell ? costCell.v : 0
      })

      current.nextRow()
    }
  }

  return data
}
