import { AppError } from '../../errors'
import { prisma } from '../../lib'
import { isPendingDocument } from '../../scripts'

export const isPendingRecordService = async (record_id: string) => {
  let is_pending = false
  let status = 'CONFIRMED'

  const record = await prisma.record.findUnique({
    where: { key: record_id },
    select: { user_id: true },
  })

  if (!record) throw new AppError('record not found', 404)

  const id = record.user_id

  const [documentFt, documentMat, documentDoc, documentDocBack, documentEnd] =
    await Promise.all([
      isPendingDocument(id, 'FT'),
      isPendingDocument(id, 'MAT', record_id),
      isPendingDocument(id, 'DOC'),
      isPendingDocument(id, 'DOC', undefined, true),
      isPendingDocument(id, 'END'),
    ])

  if (
    documentFt?.document.status === 'RECEIVED' ||
    documentMat?.document.status === 'RECEIVED' ||
    documentDoc?.document.status === 'RECEIVED' ||
    documentDocBack?.document.status === 'RECEIVED' ||
    documentEnd?.document.status === 'RECEIVED'
  )
    is_pending = true

  if (
    documentFt?.document.status === 'REFUSED' ||
    documentMat?.document.status === 'REFUSED' ||
    documentDoc?.document.status === 'REFUSED' ||
    documentDocBack?.document.status === 'REFUSED' ||
    documentEnd?.document.status === 'REFUSED'
  )
    status = 'PENDING'

  return { is_pending, status }
}
