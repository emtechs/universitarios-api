import { findDocument } from '../../scripts'

export const documentsUserService = async (id: string, record_id: string) => {
  let action_ft = {}
  let action_mt = {}
  let action_doc = {}
  let action_doc_back = {}
  let action_end = {}

  const [documentFt, documentMat, documentDoc, documentDocBack, documentEnd] =
    await Promise.all([
      findDocument(id, 'FT'),
      findDocument(id, 'MAT', record_id),
      findDocument(id, 'DOC'),
      findDocument(id, 'DOC', undefined, true),
      findDocument(id, 'END'),
    ])

  if (documentFt?.document.actions) action_ft = documentFt.document.actions[0]
  if (documentMat?.document.actions) action_mt = documentMat.document.actions[0]
  if (documentDoc?.document.actions)
    action_doc = documentDoc.document.actions[0]
  if (documentDocBack?.document.actions)
    action_doc_back = documentDocBack.document.actions[0]
  if (documentEnd?.document.actions)
    action_end = documentEnd.document.actions[0]

  return {
    foto: { ...documentFt?.document, action: action_ft },
    matricula: { ...documentMat?.document, action: action_mt },
    doc_ft_frente: {
      ...documentDoc?.document,
      action: action_doc,
    },
    doc_ft_verso: {
      ...documentDocBack?.document,
      action: action_doc_back,
    },
    end: { ...documentEnd?.document, action: action_end },
  }
}
