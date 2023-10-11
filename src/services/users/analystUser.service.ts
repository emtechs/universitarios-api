import { prisma } from '../../lib'

export const analystUserService = async (
  user_id: string,
  period_id: string,
) => {
  const record = await prisma.record.findFirst({
    where: { analyst_id: user_id, period_id, status: 'ANALYZING' },
  })

  return record
}
