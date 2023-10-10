import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const verifyCpfService = async (login: string) => {
  const user = await prisma.user.findUnique({
    where: { login },
    select: { name: true, role: true, is_first_access: true },
  })

  if (!user) throw new AppError('')

  if (user.role !== 'ADMIN' && user.is_first_access) throw new AppError('')

  return user
}
