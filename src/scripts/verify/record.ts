import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const verifyRecord = async (key: string, analyst_id: string) => {
  let is_open = true

  const record = await prisma.record.findUnique({
    where: { key },
    select: {
      analyst_id: true,
      user: { select: { name: true } },
      period: { select: { name: true } },
    },
  })

  if (!record) throw new AppError('record not found', 404)

  if (record.analyst_id) {
    if (record.analyst_id !== analyst_id) is_open = false
  }

  const select = {
    id: key,
    label: `${record.period.name} - ${record.user.name}`,
    is_open,
  }

  return { select }
}
