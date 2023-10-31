import { ILineQuery } from '../../interfaces'
import { prisma } from '../../lib'

export const listLineService = async ({
  take,
  skip,
  shift,
  week,
  is_back,
}: ILineQuery) => {
  let where = {}
  if (take) take = +take
  if (skip) skip = +skip
  if (week) week = +week

  if (is_back) where = { ...where, is_back: is_back === 'true' }

  const [lines, total] = await Promise.all([
    prisma.line.findMany({
      take,
      skip,
      where: { ...where, shift, week: { week } },
      select: {
        id: true,
        shift: true,
        is_back: true,
        route: { select: { id: true, name: true } },
        week: { select: { id: true, name: true, week: true } },
      },
    }),
    prisma.line.count({ where: { ...where, shift, week: { week } } }),
  ])

  return { total, result: lines }
}
