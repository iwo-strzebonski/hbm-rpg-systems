import mammoth from 'mammoth'

export default defineEventHandler(async (event) => {
  const { documentId } = event.context.params as { documentId: string }

  if (!documentId) {
    return createError({
      statusCode: 404,
      message: 'Not Found'
    })
  }

  const url = `https://docs.google.com/document/d/${documentId}/export?format=doc`

  const data = await $fetch<Blob>(url)

  if (!data) {
    return createError({
      statusCode: 404,
      message: 'Not Found'
    })
  }

  const documentBuffer = Buffer.from(await data.arrayBuffer())
  const doc = await mammoth.convertToHtml({ buffer: documentBuffer })

  return doc.value
})
