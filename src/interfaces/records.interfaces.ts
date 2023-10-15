import { z } from 'zod'
import { RecordUpdateSchema, StatusRecordUpdateSchema } from '../schemas'
import { IQuery } from './global.interfaces'

export type IStatus =
  | 'CONFIRMED'
  | 'REFUSED'
  | 'ANALYZING'
  | 'PENDING'
  | 'BLOCKED'
  | 'RECEIVED'

export type IRecordUpdateRequest = z.infer<typeof RecordUpdateSchema>

export type IStatusRecordUpdateRequest = z.infer<
  typeof StatusRecordUpdateSchema
>

export interface IRecordQuery extends IQuery {
  analyst_id?: string
  status?: IStatus
}
