import { prisma } from '../../lib'
import { IRecordUpdateRequest } from '../../interfaces'

export const updateRecordService = async (
  { course, school_id, semester, shift }: IRecordUpdateRequest,
  key: string,
) => {
  const record = await prisma.record.update({
    where: { key },
    data: { course, school_id, semester, shift, status: 'ANALYZING' },
  })

  return record
}
