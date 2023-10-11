import { Router } from 'express'
import {
  createStudentController,
  exportStudentController,
  listClassStudentController,
  listRecordController,
  listStudentController,
  resumeStudentController,
  retrieveStudentController,
  updateRecordController,
  updateStatusRecordController,
  updateStudentController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  RecordUpdateSchema,
  StatusRecordUpdateSchema,
  StudentCreateSchema,
  StudentUpdateSchema,
} from '../schemas'

export const studentRouter = Router()

studentRouter.post(
  '',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(StudentCreateSchema),
  createStudentController,
)

studentRouter.get('', verifyUserIsAuthenticated, listStudentController)

studentRouter.get(
  '/class',
  verifyUserIsAuthenticated,
  listClassStudentController,
)

studentRouter.get(
  '/record',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  listRecordController,
)

studentRouter.get(
  '/resume/:year_id',
  verifyUserIsAuthenticated,
  resumeStudentController,
)

studentRouter.get('/export', verifyUserIsAuthenticated, exportStudentController)

studentRouter.get('/:id', verifyUserIsAuthenticated, retrieveStudentController)

studentRouter.patch(
  '/record/:key',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(RecordUpdateSchema),
  updateRecordController,
)

studentRouter.patch(
  '/record/:key/status',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(StatusRecordUpdateSchema),
  updateStatusRecordController,
)

studentRouter.patch(
  '/:id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(StudentUpdateSchema),
  updateStudentController,
)
