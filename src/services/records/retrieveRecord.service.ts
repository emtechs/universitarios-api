import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const retrieveRecordService = async (key: string) => {
  const record = await prisma.record.findUnique({
    where: { key },
    select: {
      key: true,
      status: true,
      course: true,
      semester: true,
      total: true,
      shift: true,
      created_at: true,
      user: { select: { id: true, name: true, cpf: true } },
      school: { select: { id: true, name: true } },
      period: { select: { id: true, name: true } },
      analyst: { select: { id: true, name: true, cpf: true } },
    },
  })

  if (!record) throw new AppError('record not found', 404)

  return record
}
