import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { UserReturnSchema } from '../../schemas'

export const retrieveUserService = async (
  id: string,
  { school_id }: IQuery,
) => {
  let user = {}

  const userData = await prisma.user.findUnique({
    where: { id },
  })

  const profile_data = await prisma.documentUser.findFirst({
    where: { user_id: id, document: { category: 'FT' } },
    select: { document: { select: { image: { select: { url: true } } } } },
  })

  user = { ...user, ...userData, profile: profile_data?.document.image }

  return UserReturnSchema.parse(user)
}
