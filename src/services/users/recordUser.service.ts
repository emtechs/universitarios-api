import { prisma } from '../../lib'

export const recordUserService = async (record_id: string) => {
  const record = await prisma.record.findUnique({
    where: { key: record_id },
    include: { school: { select: { id: true, name: true } } },
  })

  return record
}
