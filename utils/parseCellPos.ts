export class Column {
  private value: string

  constructor(col: string) {
    this.value = col
  }

  next() {
    this.value = String.fromCharCode(this.value.charCodeAt(0) + 1)
  }

  prev() {
    this.value = String.fromCharCode(this.value.charCodeAt(0) - 1)
  }

  toString() {
    return this.value
  }
}

export class Row {
  private value: string

  constructor(row: string) {
    this.value = row
  }

  next() {
    this.value = (parseInt(this.value) + 1).toString()
  }

  prev() {
    this.value = (parseInt(this.value) - 1).toString()
  }

  toString() {
    return this.value
  }
}

export class CellPos {
  private _col: Column
  private _row: Row

  constructor(col: string, row: string) {
    this._col = new Column(col)
    this._row = new Row(row)
  }

  toString() {
    return `${this._col}${this._row}`
  }

  nextRow() {
    this._row.next()
  }

  nextCol() {
    this._col.next()
  }

  prevRow() {
    this._row.prev()
  }

  prevCol() {
    this._col.prev()
  }

  copy() {
    return new CellPos(this._col.toString(), this._row.toString())
  }

  get col() {
    return this._col.toString()
  }

  get row() {
    return this._row.toString()
  }
}
function positionParser(cell: string) {
  let col = ''
  let row = ''

  for (const char of cell) {
    if (isNaN(parseInt(char))) {
      col += char
    } else {
      row += char
    }
  }

  return new CellPos(col, row)
}

export interface CellRange {
  start: CellPos
  end: CellPos
}

export default function parseCellPos<T>(cellOrRange: string): T {
  if (cellOrRange.includes(':')) {
    const [start, end] = cellOrRange.split(':')

    return {
      start: positionParser(start),
      end: positionParser(end)
    } as unknown as T
  }

  return positionParser(cellOrRange) as unknown as T
}
