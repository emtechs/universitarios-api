import { ICategory } from '../interfaces'
import { prisma } from '../lib'

export const findDocument = async (
  user_id: string,
  category: ICategory,
  record_id?: string,
  is_back = false,
) => {
  return await prisma.documentUser.findFirst({
    where: { user_id, document: { category, is_back, record_id } },
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
  })
}
