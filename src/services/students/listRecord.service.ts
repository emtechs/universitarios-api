import { prisma } from '../../lib'

export const listRecordService = async () => {
  const [record, total] = await Promise.all([
    prisma.record.findMany({
      select: {
        key: true,
        status: true,
        created_at: true,
        user: { select: { id: true, name: true, cpf: true } },
      },
    }),
    prisma.record.count(),
  ])

  return { total, result: record }
}
