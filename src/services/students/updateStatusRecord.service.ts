import { prisma } from '../../lib'
import { IStatusRecordUpdateRequest } from '../../interfaces'

export const updateStatusRecordService = async (
  { status, justification }: IStatusRecordUpdateRequest,
  key: string,
  user_id: string,
) => {
  let description = ''

  switch (status) {
    case 'ANALYZING':
      description = 'Registro em análise'
      break
    case 'CONFIRMED':
      description = 'Registro aprovado'
      break
  }

  const record = await prisma.record.update({
    where: { key },
    data: {
      status,
      analyst_id: user_id,
      actions: {
        create: { description, justification, user_id },
      },
    },
  })

  return record
}
