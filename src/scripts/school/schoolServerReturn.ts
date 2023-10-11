import { IRole } from '../../interfaces'
import { schoolReturn } from './schoolReturn'

const schoolServerReturn = async (
  schoolServer: {
    role: IRole
    school: {
      id: string
    }
  },
  year_id?: string,
  date?: string,
) => {
  const { role, school } = schoolServer

  const schoolClass = await schoolReturn(
    school.id,
    year_id,
    undefined,
    undefined,
    date,
  )

  return { role, school: schoolClass }
}

export const schoolServerArrayReturn = async (
  schools: {
    role: IRole
    school: {
      id: string
    }
  }[],
  year_id?: string,
  date?: string,
) => {
  const verify = schools.map((el) => {
    return schoolServerReturn(el, year_id, date)
  })

  return Promise.all(verify).then((school) => {
    return school
  })
}
