import { z } from 'zod'
import { StatusImageUpdateSchema } from '../schemas'

export type ICategory = 'FT' | 'MAT' | 'DOC' | 'END'

export interface IImageQuery {
  category?: ICategory
  key_record?: string
  title?: string
  is_back_data?: 'true' | 'false'
}

export type IStatusImageUpdateRequest = z.infer<typeof StatusImageUpdateSchema>
