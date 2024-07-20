import XLSX from 'xlsx'

export default defineEventHandler(async (event) => {
  const { sheetId } = event.context.params as { sheetId: string }

  if (!sheetId) {
    return createError({
      statusCode: 404,
      message: 'Not Found'
    })
  }

  const url = `https://spreadsheets.google.com/feeds/download/spreadsheets/Export?key=${sheetId}&exportFormat=xlsx`

  const data = await $fetch<Blob>(url)

  if (!data) {
    return createError({
      statusCode: 404,
      message: 'Not Found'
    })
  }

  const workbookBuffer = await data.arrayBuffer()
  const workbook = XLSX.read(workbookBuffer)

  return workbook
})
