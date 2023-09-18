import { IUserReturn } from '../interfaces'
import { prisma } from '../lib'

export const userReturn = async (user: IUserReturn, school_id = '') => {
  const profile_data = await prisma.documentUser.findFirst({
    where: { user_id: user.id, document: { category: 'FT' } },
    select: { document: { select: { image: { select: { url: true } } } } },
  })

  user = { ...user, profile: profile_data?.document.image }

  return user
}

export const userReturnArray = async (
  usersData: IUserReturn[],
  school_id = '',
) => {
  const users = usersData.map((el) => userReturn(el, school_id))

  return Promise.all(users).then((school) => {
    return school
  })
}
