import { prisma } from '../../lib'

export const retrievePeriodService = async (id: string) => {
  const period = await prisma.period.findFirst({ where: { id } })

  return period
}
