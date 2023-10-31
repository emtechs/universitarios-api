import { ILineQuery } from '../../interfaces'
import { prisma } from '../../lib'

export const lineRecordService = async (
  record_id: string,
  { shift, week, is_back }: ILineQuery,
) => {
  let where_line = {}

  if (week) week = +week

  if (is_back) where_line = { ...where_line, is_back: is_back === 'true' }

  const line = await prisma.lineRecord.findFirst({
    where: { record_id, line: { ...where_line, shift, week: { week } } },
    select: {
      key: true,
      line: {
        select: {
          id: true,
          shift: true,
          is_back: true,
          route: { select: { id: true, name: true } },
          week: { select: { id: true, name: true, week: true } },
        },
      },
    },
  })

  return line?.line
}
