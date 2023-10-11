import { AppError } from '../../errors'
import { ISchoolUpdate } from '../../interfaces'
import { prisma } from '../../lib'

const verifySchoolClass = async (
  { id }: ISchoolUpdate,
  school_id: string,
  year_id: string,
) => {
  if (!id) throw new AppError('')

  const classData = await prisma.class.update({
    where: { id },
    data: {
      schools: {
        connectOrCreate: {
          create: { school_id, year_id },
          where: {
            class_id_school_id_year_id: { class_id: id, school_id, year_id },
          },
        },
      },
    },
  })

  return classData
}

export const updateSchoolClass = async (
  classes: ISchoolUpdate[],
  school_id: string,
  year_id: string,
) => {
  const schoolsVerifyParse = classes.map((el) => {
    return verifySchoolClass(el, school_id, year_id)
  })
  return Promise.all(schoolsVerifyParse).then((school) => {
    return school
  })
}
