import { IQuery, IRequestUser } from '../../interfaces'
import { prisma } from '../../lib'
import { datePeriod } from '../../scripts'

export const profileUserService = async (
  { id, role }: IRequestUser,
  { date }: IQuery,
) => {
  let requests = 0
  let user = {}
  let whereDate = {}
  let is_open = false

  if (date) whereDate = datePeriod(date)

  const [userData, period] = await Promise.all([
    prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        role: true,
        is_first_access: true,
      },
    }),
    prisma.period.findFirst({ where: whereDate, select: { id: true } }),
  ])

  const profile_data = await prisma.documentUser.findFirst({
    where: { user_id: id, document: { category: 'FT' } },
    select: { document: { select: { image: { select: { url: true } } } } },
  })

  user = { ...userData, profile: profile_data?.document.image }

  if (period) {
    const record = await prisma.record.findUnique({
      where: { user_id_period_id: { user_id: id, period_id: period.id } },
      select: { status: true },
    })

    is_open = true
    user = { ...user, is_pending: record?.status === 'PENDING' }
  }

  if (role === 'ADMIN') requests = await prisma.request.count()

  return { ...user, requests, period_id: period?.id, is_open }
}
