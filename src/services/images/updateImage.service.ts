import { prisma } from '../../lib'
import { AppError } from '../../errors'
import { env } from '../../env'
import { deleteImageKey } from '../../scripts'

export const updateImageService = async (
  id: string,
  file?: Express.Multer.File,
) => {
  if (!file) throw new AppError('')

  const { originalname: name, path, size, filename: key } = file

  const image = await prisma.image.findUnique({
    where: { id },
    select: {
      key: true,
    },
  })

  if (!image) throw new AppError('')

  await deleteImageKey(image.key)

  const data = {
    name,
    size,
    url: path,
    key,
  }

  if (env.NODE_ENV === 'production')
    return await prisma.image.update({
      where: { id },
      data,
    })

  const url = `http://localhost:${env.PORT}/files/${key}`
  data.url = url

  return await prisma.image.update({
    where: { id },
    data,
  })
}
