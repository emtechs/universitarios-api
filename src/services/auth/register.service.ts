import { hashSync } from 'bcryptjs'
import { prisma } from '../../lib'
import { IQuery, IRegisterRequest } from '../../interfaces'
import { AppError } from '../../errors'
import { datePeriod } from '../../scripts'

export const registerService = async (
  { login, name, password, cpf, email }: IRegisterRequest,
  { date }: IQuery,
) => {
  let whereDate = {}

  if (date) whereDate = datePeriod(date)

  const userData = await prisma.user.findUnique({
    where: { login },
  })

  if (userData?.role === 'ADMIN') throw new AppError('user already exists', 409)

  password = hashSync(password, 10)

  const period = await prisma.period.findFirst({
    where: whereDate,
    select: { id: true },
  })

  if (userData) {
    const user = await prisma.user.update({
      where: { login },
      data: {
        name,
        password,
        cpf,
        email,
        is_first_access: false,
      },
    })

    if (period)
      await prisma.record.create({
        data: { period_id: period.id, user_id: user.id },
      })

    return user
  }

  const user = await prisma.user.create({
    data: {
      login,
      name,
      password,
      cpf,
      email,
      is_first_access: false,
    },
  })

  if (period)
    await prisma.record.create({
      data: { period_id: period.id, user_id: user.id },
    })

  return user
}
