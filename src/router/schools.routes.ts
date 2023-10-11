import { Router } from 'express'
import {
  createSchoolClassController,
  createSchoolController,
  dashSchoolController,
  deleteSchoolController,
  exportSchoolController,
  listSchoolController,
  retrieveSchoolController,
  updateSchoolController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  SchoolClassCreateSchema,
  SchoolCreateSchema,
  SchoolUpdateSchema,
} from '../schemas'

export const schoolRouter = Router()

schoolRouter.post(
  '',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  validateSchemaMiddleware(SchoolCreateSchema),
  createSchoolController,
)

schoolRouter.post(
  '/:school_id/:year_id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(SchoolClassCreateSchema),
  createSchoolClassController,
)

schoolRouter.get('', verifyUserIsAuthenticated, listSchoolController)

schoolRouter.get('/export', verifyUserIsAuthenticated, exportSchoolController)

schoolRouter.get(
  '/:school_id',
  verifyUserIsAuthenticated,
  retrieveSchoolController,
)

schoolRouter.get(
  '/:school_id/dash/:year_id',
  verifyUserIsAuthenticated,
  dashSchoolController,
)

schoolRouter.patch(
  '/:school_id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(SchoolUpdateSchema),
  updateSchoolController,
)

schoolRouter.delete(
  '/:school_id',
  verifyUserIsAuthenticated,
  deleteSchoolController,
)
