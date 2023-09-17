import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const verifyCpfService = async (login: string) => {
  const user = await prisma.user.findUnique({
    where: { login },
    select: { name: true },
  })

  if (!user) throw new AppError('')

  return user
}
