import { IRequestUser } from '../../interfaces'
import { prisma } from '../../lib'

export const profileUserService = async ({ id, role }: IRequestUser) => {
  let requests = 0
  let user = {}

  const userData = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      dash: true,
      role: true,
      is_first_access: true,
    },
  })

  const profile_data = await prisma.documentUser.findFirst({
    where: { user_id: id, document: { category: 'FT' } },
    select: { document: { select: { image: { select: { url: true } } } } },
  })

  user = { ...userData, profile: profile_data?.document.image }

  if (role === 'ADMIN') requests = await prisma.request.count()

  return { ...user, requests }
}
