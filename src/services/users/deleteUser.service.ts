import { prisma } from '../../lib'
import { AppError } from '../../errors'
import { deleteImageKey } from '../../scripts'

export const deleteUserService = async (login: string) => {
  try {
    const documents = await prisma.document.findMany({
      where: { users: { some: { user: { login } } } },
      select: { id: true, image: { select: { key: true } } },
    })

    await documentArray(documents)

    const user = await prisma.user.delete({
      where: { login },
      select: { profile: { select: { key: true } } },
    })

    if (user.profile?.key) await deleteImageKey(user.profile.key)
  } catch {
    throw new AppError('user not found', 404)
  }
}

const documentArray = async (
  documents: {
    id: string
    image: {
      key: string
    } | null
  }[],
) => {
  const documentsData = documents.map((el) => document(el.id, el.image))

  return Promise.all(documentsData).then((document) => {
    return document
  })
}

const document = async (
  id: string,
  image: {
    key: string
  } | null,
) => {
  if (image) await deleteImageKey(image.key)

  await prisma.document.delete({ where: { id } })
}
