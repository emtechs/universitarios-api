import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { UserReturnSchema } from '../../schemas'
import { datePeriod } from '../../scripts'

export const pageUserService = async (id: string, { date }: IQuery) => {
  let whereDate = {}

  if (date) whereDate = datePeriod(date)

  const [userData, period] = await Promise.all([
    prisma.user.findUnique({
      where: { id },
    }),
    prisma.period.findFirst({ where: whereDate }),
  ])

  const profile_data = await prisma.documentUser.findFirst({
    where: { user_id: id, document: { category: 'FT' } },
    select: { document: { select: { image: { select: { url: true } } } } },
  })

  return {
    user: UserReturnSchema.parse({
      ...userData,
      profile: profile_data?.document.image,
    }),
    period,
  }
}
