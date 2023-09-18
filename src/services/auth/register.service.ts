import { hashSync } from 'bcryptjs'
import { prisma } from '../../lib'
import { IQuery, IRegisterRequest } from '../../interfaces'
import { AppError } from '../../errors'
import { UserReturnSchema } from '../../schemas'
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

  if (userData) throw new AppError('user already exists', 409)

  password = hashSync(password, 10)

  const [user, period] = await Promise.all([
    prisma.user.create({
      data: {
        login,
        name,
        password,
        cpf,
        email,
        is_first_access: false,
      },
    }),
    prisma.period.findFirst({ where: whereDate, select: { id: true } }),
  ])

  if (period)
    await prisma.record.create({
      data: { period_id: period.id, user_id: user.id },
    })

  return UserReturnSchema.parse(user)
}
