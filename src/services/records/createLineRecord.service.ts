import { ILineRecordRequest } from '../../interfaces'
import { prisma } from '../../lib'

export const createLineRecordService = async (
  { line_id }: ILineRecordRequest,
  record_id: string,
) => {
  const line = await prisma.lineRecord.create({
    data: {
      line_id,
      record_id,
    },
  })

  return line
}
