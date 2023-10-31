import { prisma } from '../../lib'

export const deleteLineRecordService = async (
  record_id: string,
  line_id: string,
) => {
  await prisma.lineRecord.delete({
    where: { line_id_record_id: { line_id, record_id } },
  })
}
