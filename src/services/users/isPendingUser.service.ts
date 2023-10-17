import { isPendingDocument } from '../../scripts'

export const isPendingUserService = async (id: string, record_id: string) => {
  const [documentFt, documentMat, documentDoc, documentDocBack, documentEnd] =
    await Promise.all([
      isPendingDocument(id, 'FT'),
      isPendingDocument(id, 'MAT', record_id),
      isPendingDocument(id, 'DOC'),
      isPendingDocument(id, 'DOC', undefined, true),
      isPendingDocument(id, 'END'),
    ])

  if (
    !documentFt ||
    !documentMat ||
    !documentDoc ||
    !documentDocBack ||
    !documentEnd
  )
    return true

  if (
    documentFt.document.status === 'REFUSED' ||
    documentMat.document.status === 'REFUSED' ||
    documentDoc.document.status === 'REFUSED' ||
    documentDocBack.document.status === 'REFUSED' ||
    documentEnd.document.status === 'REFUSED'
  )
    return true

  return false
}
