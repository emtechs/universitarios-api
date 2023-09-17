import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { UserReturnSchema } from '../../schemas'
import { listPeriodService } from '../calendar'

export const pageUserService = async (id: string, { date }: IQuery) => {
  const [userData, periodsData] = await Promise.all([
    prisma.user.findUnique({
      where: { id },
    }),
    listPeriodService({ date }),
  ])

  const profile = await prisma.imageData.findFirst({
    where: { image: { user_id: id } },
    select: { url: true },
  })

  const periods = periodsData.result.map((el) => el)

  return { user: UserReturnSchema.parse({ ...userData, profile }), periods }
}
