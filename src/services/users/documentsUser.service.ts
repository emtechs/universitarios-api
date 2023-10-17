import { findDocument } from '../../scripts'

export const documentsUserService = async (id: string, record_id: string) => {
  let is_pending = false
  let result = {}

  const [documentFt, documentMat, documentDoc, documentDocBack, documentEnd] =
    await Promise.all([
      findDocument(id, 'FT'),
      findDocument(id, 'MAT', record_id),
      findDocument(id, 'DOC'),
      findDocument(id, 'DOC', undefined, true),
      findDocument(id, 'END'),
    ])

  if (
    !documentFt ||
    !documentMat ||
    !documentDoc ||
    !documentDocBack ||
    !documentEnd
  )
    is_pending = true

  if (documentFt)
    result = {
      ...result,
      foto: {
        ...documentFt.document,
        action: documentFt.document.actions.at(0),
      },
    }

  if (documentMat)
    result = {
      ...result,
      matricula: {
        ...documentMat.document,
        action: documentMat.document.actions.at(0),
      },
    }

  if (documentDoc || documentDocBack) {
    let doc_id = {}

    if (documentDoc?.document.status === documentDocBack?.document.status) {
      doc_id = { ...doc_id, status: documentDoc?.document.status }
    } else if (
      documentDoc?.document.status === 'REFUSED' ||
      documentDocBack?.document.status === 'REFUSED'
    ) {
      doc_id = { ...doc_id, status: 'REFUSED' }
    } else if (
      documentDoc?.document.status !== 'RECEIVED' ||
      documentDocBack?.document.status !== 'RECEIVED'
    )
      doc_id = { ...doc_id, status: 'ANALYZING' }

    if (documentDoc)
      doc_id = {
        ...doc_id,
        frente: {
          ...documentDoc.document,
          action: documentDoc.document.actions.at(0),
        },
      }

    if (documentDocBack)
      doc_id = {
        ...doc_id,
        verso: {
          ...documentDocBack.document,
          action: documentDocBack.document.actions.at(0),
        },
      }
    result = { ...result, doc_id }
  }

  if (documentEnd)
    result = {
      ...result,
      end: {
        ...documentEnd.document,
        action: documentEnd.document.actions.at(0),
      },
    }

  return { ...result, is_pending }
}
