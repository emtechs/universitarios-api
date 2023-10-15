import { prisma } from '../../lib'
import { IYearRequest } from '../../interfaces'
import { AppError } from '../../errors'

export const createYearService = async ({ year }: IYearRequest) => {
  let yearData = await prisma.year.findUnique({ where: { year } })

  if (yearData) throw new AppError('year already exists', 409)

  yearData = await prisma.year.create({
    data: {
      year,
    },
  })

  await Promise.all([
    prisma.period.create({
      data: {
        name: `${year}.1`,
        date_initial: new Date(`${year}-01-01`),
        date_final: new Date(`${year}-07-31`),
        year_id: yearData.id,
      },
    }),
    prisma.period.create({
      data: {
        name: `${year}.2`,
        date_initial: new Date(`${year}-08-01`),
        date_final: new Date(`${year}-12-31`),
        year_id: yearData.id,
      },
    }),
  ])

  return yearData
}
