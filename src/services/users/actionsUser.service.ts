import sortArray from 'sort-array'
import { prisma } from '../../lib'
import { actionsFindMany } from '../students'

export const actionsUserService = async (user_id: string) => {
  const actions = await prisma.action.findMany({
    where: { user_id, record_id: null },
    select: {
      id: true,
      description: true,
      justification: true,
      created_at: true,
      user: { select: { id: true, name: true, cpf: true } },
    },
  })

  const records = await prisma.record.findMany({
    where: { user_id },
    select: { key: true },
  })

  const result = [...actions]

  const recordsData = await recordsArray(records)

  recordsData.forEach((el) => result.push(...el))

  return {
    total: result.length,
    result: sortArray(result, {
      by: 'created_at',
      order: 'desc',
    }),
  }
}

const recordsArray = async (
  records: {
    key: string
  }[],
) => {
  const recordsData = records.map((el) => actionsFindMany(el.key))

  return Promise.all(recordsData).then((action) => {
    return action
  })
}
