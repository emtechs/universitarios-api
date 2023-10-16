import { AppError } from '../../errors'
import { prisma } from '../../lib'
import { documentsUserService } from '../users'

export const documentsRecordService = async (record_id: string) => {
  const record = await prisma.record.findUnique({
    where: { key: record_id },
    select: { user_id: true },
  })

  if (!record) throw new AppError('record not found', 404)

  return await documentsUserService(record.user_id, record_id)
}
