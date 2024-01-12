import XLSX from 'xlsx'

import { CELLS_TO_READ } from '~/settings/constants'

import type { CharacterInfo } from '~/types'

export default function parseCharacterData(worksheet: XLSX.WorkSheet): CharacterInfo {
  const data: CharacterInfo = {
    'base-info': [],
    'attributes': [],
    'skills': [],
    'talents': []
  }

  for (const k in CELLS_TO_READ) {
    const { range: cellRange, name: nameColumn, value: valueColumn, customData: customDataColumn } = CELLS_TO_READ[k]

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

      data[key].push({
        key: worksheet[`${nameColumn}${current.row}`].v,
        value: worksheet[`${valueColumn}${current.row}`].v,
        customData: customDataCell ? customDataCell.v : 0
      })

      current.nextRow()
    }
  }

  return data
}
