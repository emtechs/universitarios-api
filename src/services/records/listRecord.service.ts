import { IRecordQuery } from '../../interfaces'
import { prisma } from '../../lib'

export const listRecordService = async ({
  take,
  skip,
  name,
  status,
}: IRecordQuery) => {
  if (take) take = +take
  if (skip) skip = +skip

  const [record, total] = await Promise.all([
    prisma.record.findMany({
      take,
      skip,
      where: {
        status,
        user: { name: { contains: name, mode: 'insensitive' } },
      },
      select: {
        key: true,
        status: true,
        created_at: true,
        user: { select: { id: true, name: true, cpf: true } },
        analyst: { select: { id: true, name: true, cpf: true } },
        period: { select: { id: true, name: true } },
      },
    }),
    prisma.record.count({
      where: {
        status,
        user: { name: { contains: name, mode: 'insensitive' } },
      },
    }),
  ])

  return { total, result: record }
}
