import { hashSync } from 'bcryptjs'
import { prisma } from '../../lib'
import { IUserQuery, IUserRequest } from '../../interfaces'
import { AppError } from '../../errors'
import { UserReturnSchema } from '../../schemas'
import { updateSchoolDirector, updateSchoolServer } from '../../scripts'

export const createUserService = async (
  { login, name, password, cpf, role, schools }: IUserRequest,
  { allNotServ, is_server }: IUserQuery,
) => {
  let user = await prisma.user.findUnique({
    where: { login },
  })

  if (schools) {
    if (!user) {
      password = hashSync(password, 10)
      user = await prisma.user.create({
        data: {
          login,
          name,
          password,
          cpf,
        },
      })
    } else {
      await prisma.user.update({
        where: { login },
        data: { is_active: true },
      })
    }

    if (is_server) {
      await updateSchoolServer(schools, user.id)
    } else await updateSchoolDirector(schools, user.id)

    return UserReturnSchema.parse(user)
  }

  if (allNotServ) {
    if (user) {
      const server = await prisma.user.update({
        where: { id: user.id },
        data: { is_active: true },
      })
      return UserReturnSchema.parse(server)
    }

    password = hashSync(password, 10)

    const server = await prisma.user.create({
      data: {
        login,
        name,
        cpf,
        password,
      },
    })

    return UserReturnSchema.parse(server)
  }

  if (user) throw new AppError('user already exists', 409)

  password = hashSync(password, 10)

  user = await prisma.user.create({
    data: {
      login,
      name,
      password,
      cpf,
      role,
    },
  })

  return UserReturnSchema.parse(user)
}
