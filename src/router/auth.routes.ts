import { Router } from 'express'
import {
  validateSchemaMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  createSessionController,
  registerController,
  sendEmailToRecovery,
  updatePasswordController,
  verifyController,
  verifyCpfController,
  verifyPasswordController,
} from '../controllers'
import {
  PasswordUpdateSchema,
  RecoveryPasswordSchema,
  RegisterSchema,
  SessionSchema,
} from '../schemas'

export const sessionRouter = Router()

sessionRouter.post(
  '',
  validateSchemaMiddleware(SessionSchema),
  createSessionController,
)

sessionRouter.post(
  '/register',
  validateSchemaMiddleware(RegisterSchema),
  registerController,
)

sessionRouter.get('/:cpf', verifyCpfController)

export const passwordRouter = Router()

passwordRouter.post(
  '',
  validateSchemaMiddleware(RecoveryPasswordSchema),
  sendEmailToRecovery,
)

passwordRouter.post(
  '/:userId/:token',
  validateSchemaMiddleware(PasswordUpdateSchema),
  updatePasswordController,
)

export const verifyRouter = Router()

verifyRouter.post(
  '/password',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(PasswordUpdateSchema),
  verifyPasswordController,
)

verifyRouter.get('', verifyUserIsAuthenticated, verifyController)
