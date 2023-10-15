import { prisma } from '../../lib'

export const actionsRecordService = async (record_id: string) => {
  const result = await actionsFindMany(record_id)

  return { total: result.length, result }
}

export const actionsFindMany = async (record_id: string) => {
  const actions = await prisma.action.findMany({
    where: { record_id },
    select: {
      id: true,
      description: true,
      justification: true,
      created_at: true,
      user: { select: { id: true, name: true, cpf: true } },
    },
    orderBy: { created_at: 'desc' },
  })

  return actions
}
