import { prisma } from '../../lib'

export const listImageService = async () => {
  const images = await prisma.document.findMany()

  return images
}
