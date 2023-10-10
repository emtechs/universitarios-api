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
        dash: true,
        role: true,
        is_super: true,
        is_first_access: true,
        profile: { select: { url: true } },
      },
    }),
    prisma.period.findFirst({ where: whereDate, select: { id: true } }),
  ])

  if (role !== 'ADMIN') {
    const profile_data = await prisma.documentUser.findFirst({
      where: { user_id: id, document: { category: 'FT' } },
      select: { document: { select: { image: { select: { url: true } } } } },
    })

    user = { ...user, profile: profile_data?.document.image }
  }

  if (period) {
    const record = await prisma.record.findUnique({
      where: { user_id_period_id: { user_id: id, period_id: period.id } },
      select: { status: true, key: true },
    })

    is_open = true
    user = {
      ...user,
      is_pending: record?.status === 'PENDING',
      record_id: record?.key,
    }
  }

  if (role === 'ADMIN') requests = await prisma.request.count()

  return { ...userData, ...user, requests, period_id: period?.id, is_open }
}
