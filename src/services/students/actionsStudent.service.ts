import { prisma } from '../../lib'

export const actionsStudentService = async (record_id: string) => {
  const actions = await prisma.action.findMany({
    where: { record_id },
    orderBy: { created_at: 'desc' },
  })

  return actions
}
