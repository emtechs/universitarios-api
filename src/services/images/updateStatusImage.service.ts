import { prisma } from '../../lib'
import { IStatusImageUpdateRequest } from '../../interfaces'

export const updateStatusImageService = async (
  { status, justification, title }: IStatusImageUpdateRequest,
  id: string,
  user_id: string,
) => {
  let description = ''

  switch (status) {
    case 'ANALYZING':
      description = `${title} em análise`
      break
    case 'CONFIRMED':
      description = `${title} aprovado`
      break
    case 'RECEIVED':
      description = `${title} com pendências resolvidas`
      break
    case 'REFUSED':
      description = `${title} recusado`
      break
  }

  const record = await prisma.document.update({
    where: { id },
    data: {
      status,
      actions: {
        create: { description, justification, user_id },
      },
    },
  })

  return record
}
