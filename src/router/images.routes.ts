import { Router } from 'express'
import {
  validateSchemaMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { upload } from '../lib'
import {
  createImageController,
  createImageProfileController,
  deleteImageController,
  updateImageController,
  updateStatusImageController,
} from '../controllers'
import { StatusImageUpdateSchema } from '../schemas'

export const imageRouter = Router()

imageRouter.post(
  '/user',
  verifyUserIsAuthenticated,
  upload.single('image'),
  createImageProfileController,
)

imageRouter.post(
  '/user/:user_id',
  upload.single('image'),
  createImageController,
)

imageRouter.delete('/:id', verifyUserIsAuthenticated, deleteImageController)

imageRouter.patch(
  '/:id',
  verifyUserIsAuthenticated,
  upload.single('image'),
  updateImageController,
)

imageRouter.patch(
  '/:id/status',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(StatusImageUpdateSchema),
  updateStatusImageController,
)
