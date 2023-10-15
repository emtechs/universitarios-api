import { Router } from 'express'
import {
  importClassController,
  importMonthController,
  importSchoolController,
  importUserController,
} from '../controllers'
import { verifyUserIsAuthenticated } from '../middlewares'
import { uploadCsv } from '../lib'

export const importRouter = Router()

importRouter.post(
  '/user',
  verifyUserIsAuthenticated,
  uploadCsv.single('file'),
  importUserController,
)

importRouter.post(
  '/school',
  verifyUserIsAuthenticated,
  uploadCsv.single('file'),
  importSchoolController,
)

importRouter.post(
  '/class',
  verifyUserIsAuthenticated,
  uploadCsv.single('file'),
  importClassController,
)

importRouter.post(
  '/month',
  verifyUserIsAuthenticated,
  uploadCsv.single('file'),
  importMonthController,
)
