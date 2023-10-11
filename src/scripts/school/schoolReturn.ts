import { prisma } from '../../lib'

export const schoolReturn = async (
  id: string,
  year_id?: string,
  class_id?: string,
  date?: string,
) => {
  const school_id = id

  let schoolData = {}
  let infrequency = 0
  let where = {}

  if (year_id) where = { ...where, year_id }
  if (class_id) where = { ...where, class_id }

  where = { ...where, school_id }

  const [school, classes, students, frequencyData, frequencies] =
    await Promise.all([
      prisma.school.findUnique({
        where: { id },
      }),
      prisma.classYear.count({ where }),
      prisma.classStudent.count({
        where: { ...where },
      }),
      prisma.frequency.aggregate({
        _avg: { infrequency: true },
        where: { ...where, is_open: false, date },
      }),
      prisma.frequency.count({
        where: { ...where, is_open: false, date },
      }),
    ])

  if (school) schoolData = { ...schoolData, ...school }

  if (frequencyData._avg.infrequency)
    infrequency = frequencyData._avg.infrequency

  schoolData = {
    ...schoolData,
    classes,
    students,
    frequencies,
    infrequency,
  }

  return schoolData
}

export const schoolArrayReturn = async (
  schools: {
    id: string
  }[],
  year_id?: string,
  class_id?: string,
  date?: string,
) => {
  const verify = schools.map((el) => {
    return schoolReturn(el.id, year_id, class_id, date)
  })

  return Promise.all(verify).then((school) => {
    return school
  })
}
