import { prisma } from '../../lib'

export const documentsUserService = async (id: string, record_id: string) => {
  let action_ft = {}
  let action_mt = {}

  const [documentFt, documentMat] = await Promise.all([
    prisma.documentUser.findFirst({
      where: { user_id: id, document: { category: 'FT' } },
      select: {
        document: {
          select: {
            id: true,
            status: true,
            record_id: true,
            image: { select: { id: true, url: true } },
            actions: {
              take: 1,
              select: {
                id: true,
                description: true,
                justification: true,
                created_at: true,
                user: { select: { id: true, name: true, cpf: true } },
              },
              orderBy: { created_at: 'desc' },
            },
          },
        },
      },
    }),
    prisma.documentUser.findFirst({
      where: { user_id: id, document: { category: 'MAT', record_id } },
      select: {
        document: {
          select: {
            id: true,
            status: true,
            record_id: true,
            image: { select: { id: true, url: true } },
            actions: {
              take: 1,
              select: {
                id: true,
                description: true,
                justification: true,
                created_at: true,
                user: { select: { id: true, name: true, cpf: true } },
              },
              orderBy: { created_at: 'desc' },
            },
          },
        },
      },
    }),
  ])

  if (documentFt?.document.actions) action_ft = documentFt.document.actions[0]
  if (documentMat?.document.actions) action_mt = documentMat.document.actions[0]

  return {
    foto: { ...documentFt?.document, action: action_ft },
    matricula: { ...documentMat?.document, action: action_mt },
  }
}
