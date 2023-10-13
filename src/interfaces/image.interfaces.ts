import { z } from 'zod'
import { StatusImageUpdateSchema } from '../schemas'

export interface iImageQuery {
  category?: 'FT' | 'MAT'
  key_record?: string
}

export type IStatusImageUpdateRequest = z.infer<typeof StatusImageUpdateSchema>
