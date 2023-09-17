import { IQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { UserReturnSchema } from '../../schemas'

export const pageUserService = async (id: string, { date }: IQuery) => {
  let whereDate = {}

  if (date) {
    const dateData = date.split('/')
    const date_time = new Date(`${dateData[2]}-${dateData[1]}-${dateData[0]}`)
    whereDate = {
      date_initial: { lte: date_time },
      date_final: { gte: date_time },
    }
  }

  const [userData, period] = await Promise.all([
    prisma.user.findUnique({
      where: { id },
    }),
    prisma.period.findFirst({ where: whereDate }),
  ])

  const profile = await prisma.imageData.findFirst({
    where: { image: { user_id: id } },
    select: { url: true },
  })

  return { user: UserReturnSchema.parse({ ...userData, profile }), period }
}
