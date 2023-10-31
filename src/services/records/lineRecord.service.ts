import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'

export const lineRecordService = async (record_id: string, { by }: IQuery) => {
  const line = await prisma.lineRecord.findMany({ where: { record_id } })

  return line
}
