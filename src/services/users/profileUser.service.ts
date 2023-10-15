import { IQuery, IRequestUser } from '../../interfaces'
import { prisma } from '../../lib'
import { datePeriod } from '../../scripts'

export const profileUserService = async (
  { id, role }: IRequestUser,
  { date }: IQuery,
) => {
  let user = {}
  let is_block = false
  let is_open = false

  const userData = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      cpf: true,
      email: true,
      role: true,
      is_super: true,
      is_first_access: true,
      profile: { select: { url: true } },
    },
  })

  if (role !== 'ADMIN') {
    const profile_data = await prisma.documentUser.findFirst({
      where: { user_id: id, document: { category: 'FT' } },
      select: { document: { select: { image: { select: { url: true } } } } },
    })

    user = { ...user, profile: profile_data?.document.image }
  }

  if (date) {
    const period = await prisma.period.findFirst({
      where: datePeriod(date),
      select: { id: true },
    })

    if (!period) {
      is_open = false
    } else {
      const record = await prisma.record.findUnique({
        where: { user_id_period_id: { user_id: id, period_id: period.id } },
        select: { status: true, key: true, document: true },
      })

      if (role === 'ADMIN') {
        const [records, analysis] = await Promise.all([
          prisma.record.count({
            where: {
              period_id: period.id,
              status: 'RECEIVED',
              analyst_id: { equals: null },
            },
          }),
          prisma.record.count({
            where: {
              period_id: period.id,
              status: 'ANALYZING',
              analyst_id: id,
            },
          }),
        ])

        user = { ...user, records, analysis }
      }

      if (
        !record ||
        record?.status === 'BLOCKED' ||
        record?.status === 'REFUSED'
      )
        is_block = true

      is_open = true
      user = {
        ...user,
        is_pending: record?.status === 'PENDING' && !record.document,
        record_id: record?.key,
        period_id: period.id,
        status: record?.status,
      }
    }
  }

  return { ...userData, ...user, is_open, is_block }
}
