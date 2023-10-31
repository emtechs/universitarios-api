import { Router } from 'express'
import {
  actionsRecordController,
  createLineRecordController,
  deleteLineRecordController,
  documentsRecordController,
  isPendingRecordController,
  lineRecordController,
  listRecordController,
  retrieveRecordController,
  updateRecordController,
  updateStatusRecordController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  LineRecordCreateSchema,
  RecordUpdateSchema,
  StatusRecordUpdateSchema,
} from '../schemas'

export const recordRouter = Router()

recordRouter.post(
  '/:record_id/line',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(LineRecordCreateSchema),
  createLineRecordController,
)

recordRouter.get(
  '',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  listRecordController,
)

recordRouter.get(
  '/:record_id',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  retrieveRecordController,
)

recordRouter.get(
  '/:record_id/documents',
  verifyUserIsAuthenticated,
  documentsRecordController,
)

recordRouter.get(
  '/:record_id/pending',
  verifyUserIsAuthenticated,
  isPendingRecordController,
)

recordRouter.get(
  '/:record_id/line',
  verifyUserIsAuthenticated,
  lineRecordController,
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

recordRouter.delete(
  '/:record_id/line',
  verifyUserIsAuthenticated,
  deleteLineRecordController,
)
