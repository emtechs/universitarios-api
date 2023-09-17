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

  const profile = await prisma.imageData.findFirst({
    where: { image: { user_id: id } },
    select: { url: true },
  })

  user = { ...userData, profile }

  if (role === 'ADMIN') requests = await prisma.request.count()

  return { ...user, requests }
}
