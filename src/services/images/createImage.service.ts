import { prisma } from '../../lib'
import { AppError } from '../../errors'
import { env } from '../../env'
import { IImageQuery } from '../../interfaces'

export const createImageService = async (
  user_id: string,
  { category = 'FT', key_record, title, is_back_data }: IImageQuery,
  file?: Express.Multer.File,
) => {
  const is_back = is_back_data === 'true'

  if (!file) throw new AppError('')

  const { originalname: name, path, size, filename: key } = file

  const data = {
    name,
    size,
    url: path,
    key,
  }

  if (env.NODE_ENV === 'production') {
    if (key_record)
      return await prisma.record.update({
        where: { key: key_record },
        data: {
          document: {
            create: {
              category,
              status: 'RECEIVED',
              is_back,
              image: { create: { ...data } },
              users: { create: { user_id } },
              actions: {
                create: {
                  description: `${title} Recebido`,
                  user_id,
                  record_id: key_record,
                },
              },
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
            status: 'RECEIVED',
            is_back,
            users: { create: { user_id } },
            actions: {
              create: {
                description: `${title} Recebido`,
                user_id,
              },
            },
          },
        },
      },
    })
  }

  const url = `http://localhost:${env.PORT}/files/${key}`
  data.url = url

  if (key_record)
    return await prisma.record.update({
      where: { key: key_record },
      data: {
        document: {
          create: {
            category,
            status: 'RECEIVED',
            is_back,
            image: { create: { ...data } },
            users: { create: { user_id } },
            actions: {
              create: {
                description: `${title} Recebido`,
                user_id,
                record_id: key_record,
              },
            },
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
          status: 'RECEIVED',
          is_back,
          users: { create: { user_id } },
          actions: {
            create: {
              description: `${title} Recebido`,
              user_id,
            },
          },
        },
      },
    },
  })
}
