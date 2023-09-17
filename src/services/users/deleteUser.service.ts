import { prisma } from '../../lib'
import { AppError } from '../../errors'
import { deleteImageService } from '../images'

export const deleteUserService = async (login: string) => {
  try {
    const user = await prisma.user.delete({
      where: { login },
      select: { profile: { select: { image: { select: { id: true } } } } },
    })
    if (user.profile) await deleteImageService(user.profile.image.id)
  } catch {
    throw new AppError('user not found', 404)
  }
}
