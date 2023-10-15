import { Router } from 'express'
import {
  actionsRecordController,
  listRecordController,
  updateRecordController,
  updateStatusRecordController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { RecordUpdateSchema, StatusRecordUpdateSchema } from '../schemas'

export const recordRouter = Router()

recordRouter.get(
  '',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  listRecordController,
)

recordRouter.patch(
  '/:record_id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(RecordUpdateSchema),
  updateRecordController,
)

recordRouter.patch(
  '/:record_id/status',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(StatusRecordUpdateSchema),
  updateStatusRecordController,
)

recordRouter.get(
  '/:record_id/actions',
  verifyUserIsAuthenticated,
  actionsRecordController,
)
