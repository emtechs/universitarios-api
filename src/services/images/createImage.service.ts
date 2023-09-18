import { prisma } from '../../lib'
import { AppError } from '../../errors'
import { env } from '../../env'
import { iImageQuery } from '../../interfaces'

export const createImageService = async (
  user_id: string,
  { category, key_record }: iImageQuery,
  file?: Express.Multer.File,
) => {
  if (!file) throw new AppError('')

  const { originalname: name, path, size, filename: key } = file

  const data = {
    name,
    size,
    url: path,
    key,
  }

  if (env.NODE_ENV === 'production') {
    if (category === 'MAT' && key_record)
      return await prisma.record.update({
        where: { key: key_record },
        data: {
          document: {
            create: {
              category,
              status: 'ANALYZING',
              image: { create: { ...data } },
              users: { create: { user_id } },
            },
          },
        },
      })

    return await prisma.image.create({
      data: {
        ...data,
        document: {
          create: {
            category,
            status: 'ANALYZING',
            users: { create: { user_id } },
          },
        },
      },
    })
  }

  const url = `http://localhost:${env.PORT}/files/${key}`
  data.url = url

  if (category === 'MAT' && key_record)
    return await prisma.record.update({
      where: { key: key_record },
      data: {
        document: {
          create: {
            category,
            status: 'ANALYZING',
            image: { create: { ...data } },
            users: { create: { user_id } },
          },
        },
      },
    })

  return await prisma.image.create({
    data: {
      ...data,
      document: {
        create: {
          category,
          status: 'ANALYZING',
          users: { create: { user_id } },
        },
      },
    },
  })
}