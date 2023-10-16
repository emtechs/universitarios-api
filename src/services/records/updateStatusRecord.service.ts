import { prisma } from '../../lib'
import { IRecordQuery, IStatusRecordUpdateRequest } from '../../interfaces'
import { AppError } from '../../errors'
import { verifyRecord } from '../../scripts'

export const updateStatusRecordService = async (
  { status, justification }: IStatusRecordUpdateRequest,
  key: string,
  user_id: string,
  { analyst_id }: IRecordQuery,
) => {
  if (analyst_id) {
    const record = await verifyRecord(key, analyst_id)

    if (!record.select.is_open) throw new AppError('')
  }

  let description = ''

  switch (status) {
    case 'ANALYZING':
      description = 'Registro em análise'
      break
    case 'CONFIRMED':
      description = 'Registro aprovado'
      break
    case 'PENDING':
      description = 'Registro com pendências'
      break
    case 'RECEIVED':
      description = 'Registro com pendências resolvidas'
      break
    case 'BLOCKED':
      description = 'Registro bloqueado'
      break
    case 'REFUSED':
      description = 'Registro recusado'
      break
  }

  const record = await prisma.record.update({
    where: { key },
    data: {
      status,
      analyst_id,
      actions: {
        create: { description, justification, user_id },
      },
    },
  })

  return record
}
