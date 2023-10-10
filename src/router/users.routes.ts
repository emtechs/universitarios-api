import { Router } from 'express'
import {
  createUserController,
  dashUserController,
  deleteUserController,
  documentsUserController,
  exportUserController,
  listUserController,
  listWorkSchoolController,
  pageUserController,
  profileUserController,
  recordUserController,
  retrieveUserController,
  retrieveUserWithCpfController,
  updateUserController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyIsAdmin,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { UserCreateSchema, UserUpdateRequestSchema } from '../schemas'

export const userRouter = Router()

userRouter.post(
  '',
  validateSchemaMiddleware(UserCreateSchema),
  createUserController,
)

userRouter.get('', verifyUserIsAuthenticated, verifyIsAdmin, listUserController)

userRouter.get('/page', verifyUserIsAuthenticated, pageUserController)

userRouter.get('/profile', verifyUserIsAuthenticated, profileUserController)

userRouter.get('/export', verifyUserIsAuthenticated, exportUserController)

userRouter.get('/schools', verifyUserIsAuthenticated, listWorkSchoolController)

userRouter.get(
  '/cpf/:cpf',
  verifyUserIsAuthenticated,
  retrieveUserWithCpfController,
)

userRouter.get(
  '/record/:record_id',
  verifyUserIsAuthenticated,
  recordUserController,
)

userRouter.get(
  '/documents/:record_id',
  verifyUserIsAuthenticated,
  documentsUserController,
)

userRouter.get('/dash/:year_id', verifyUserIsAuthenticated, dashUserController)

userRouter.get('/:id', verifyUserIsAuthenticated, retrieveUserController)

userRouter.patch(
  '/:id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(UserUpdateRequestSchema),
  updateUserController,
)

userRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  deleteUserController,
)
