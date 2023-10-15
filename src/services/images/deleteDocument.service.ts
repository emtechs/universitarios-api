import { AppError } from '../../errors'
import { prisma } from '../../lib'
import { deleteImageKey } from '../../scripts'

export const deleteDocumentService = async (id: string) => {
  try {
    const document = await prisma.document.findUnique({
      where: { id },
      select: { image: { select: { key: true } } },
    })

    if (document?.image) await deleteImageKey(document.image.key)

    await prisma.document.delete({ where: { id } })
  } catch {
    throw new AppError('document not found', 404)
  }
}
