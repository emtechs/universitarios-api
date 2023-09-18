import { prisma } from '../../lib'
import { AppError } from '../../errors'
import { deleteImageKey } from '../../scripts'

export const deleteImageService = async (id: string) => {
  try {
    const { key } = await prisma.image.delete({
      where: { id },
    })
    await deleteImageKey(key)
  } catch {
    throw new AppError('image not found', 404)
  }
}
