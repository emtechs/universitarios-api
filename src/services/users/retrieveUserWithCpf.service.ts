import { AppError } from '../../errors'
import { IUserQuery } from '../../interfaces'
import { prisma } from '../../lib'

export const retrieveUserWithCpfService = async (
  login: string,
  { allNotServ }: IUserQuery,
) => {
  const user = await prisma.user.findUnique({
    where: { login },
    select: { name: true, role: true },
  })

  if (allNotServ) {
    if (user) throw new AppError('user already exists', 409)
    return { name: '' }
  }

  if (!user) throw new AppError('user not found', 404)

  return user
}
