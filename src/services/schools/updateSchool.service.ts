import { ISchoolUpdateRequest } from '../../interfaces'
import { prisma } from '../../lib'
import { SchoolReturnSchema } from '../../schemas'

export const updateSchoolService = async (
  { is_active, name }: ISchoolUpdateRequest,
  id: string,
) => {
  const select = {
    id: true,
    name: true,
    is_active: true,
  }

  const school = await prisma.school.update({
    where: { id },
    data: { name, is_active },
    select,
  })

  return SchoolReturnSchema.parse(school)
}
