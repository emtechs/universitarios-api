import { ICategory } from '../../interfaces'
import { prisma } from '../../lib'

export const isPendingDocument = async (
  user_id: string,
  category: ICategory,
  record_id?: string,
  is_back = false,
) => {
  return await prisma.documentUser.findFirst({
    where: { user_id, document: { category, is_back, record_id } },
    select: {
      document: { select: { status: true } },
    },
  })
}
