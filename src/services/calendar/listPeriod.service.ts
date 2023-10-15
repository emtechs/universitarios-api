import { ICalendarQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { PeriodReturnSchema } from '../../schemas'
import { datePeriod } from '../../scripts'

export const listPeriodService = async ({
  year_id,
  name,
  date,
}: ICalendarQuery) => {
  let whereDate = {}

  if (date) whereDate = datePeriod(date)

  const [periods, total] = await Promise.all([
    prisma.period.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        year_id,
        ...whereDate,
      },
      include: { year: true },
      orderBy: { name: 'desc' },
    }),
    prisma.period.count({
      where: {
        name: { contains: name, mode: 'insensitive' },
        year_id,
        ...whereDate,
      },
    }),
  ])

  return { total, result: PeriodReturnSchema.parse(periods) }
}
