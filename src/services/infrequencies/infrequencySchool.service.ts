import { ICalendarQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { classArrayDateReturn } from '../../scripts'

export const infrequencySchoolService = async (
  school_id: string,
  year_id: string,
  { date }: ICalendarQuery,
) => {
  const classes = await prisma.classYear.findMany({
    where: { school_id, year_id },
    select: {
      key: true,
      class: { select: { id: true, name: true } },
    },
    orderBy: { class: { name: 'asc' } },
  })

  let result = classes.map((el) => {
    return {
      id: el.class.id,
      name: el.class.name,
      infrequency: 0,
      frequencies: 0,
    }
  })

  if (date) result = await classArrayDateReturn(classes, date)

  return result
}
