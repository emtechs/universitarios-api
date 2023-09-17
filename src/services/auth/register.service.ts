import { hashSync } from 'bcryptjs'
import { prisma } from '../../lib'
import { IRegisterRequest } from '../../interfaces'
import { AppError } from '../../errors'
import { UserReturnSchema } from '../../schemas'

export const registerService = async ({
  login,
  name,
  password,
  cpf,
}: IRegisterRequest) => {
  let user = await prisma.user.findUnique({
    where: { login },
  })

  if (user) throw new AppError('user already exists', 409)

  password = hashSync(password, 10)

  user = await prisma.user.create({
    data: {
      login,
      name,
      password,
      cpf,
      is_first_access: false,
    },
  })

  return UserReturnSchema.parse(user)
}
