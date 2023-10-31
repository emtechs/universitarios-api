import { z } from 'zod'
import { LineRecordCreateSchema } from '../schemas'
import { IQuery } from './global.interfaces'

export type IShift = 'MORNING' | 'AFTERNOON' | 'NIGHT' | 'FULL'

export interface ILineQuery extends IQuery {
  shift?: IShift
  week?: number
  is_back?: 'true' | 'false'
}

export type ILineRecordRequest = z.infer<typeof LineRecordCreateSchema>
