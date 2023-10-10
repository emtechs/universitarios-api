import { prisma } from '../../lib'

export const documentsUserService = async (id: string, record_id: string) => {
  const [documentFt, documentMat] = await Promise.all([
    prisma.documentUser.findFirst({
      where: { user_id: id, document: { category: 'FT' } },
      select: {
        document: {
          select: {
            id: true,
            status: true,
            image: { select: { id: true, url: true } },
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
            image: { select: { id: true, url: true } },
          },
        },
      },
    }),
  ])

  return {
    foto: { ...documentFt?.document },
    matricula: { ...documentMat?.document },
  }
}
