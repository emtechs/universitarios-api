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

  if (documentDoc)
    result = {
      ...result,
      doc_ft_frente: {
        ...documentDoc.document,
        action: documentDoc.document.actions.at(0),
      },
    }

  if (documentDocBack)
    result = {
      ...result,
      doc_ft_verso: {
        ...documentDocBack.document,
        action: documentDocBack.document.actions.at(0),
      },
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
