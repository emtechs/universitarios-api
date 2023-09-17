import { prisma } from '../../lib'
import { IYearRequest } from '../../interfaces'
import { AppError } from '../../errors'

export const createYearService = async ({ year }: IYearRequest) => {
  const yearData = await prisma.year.findUnique({ where: { year } })

  if (yearData) throw new AppError('year already exists', 409)

  return await prisma.year.create({
    data: {
      year,
    },
  })
}
