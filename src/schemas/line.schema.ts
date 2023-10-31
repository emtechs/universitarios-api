import { z } from 'zod'

export const LineRecordCreateSchema = z.object({
  line_id: z.string().uuid(),
})
