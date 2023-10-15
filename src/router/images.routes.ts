import { Router } from 'express'
import {
  validateSchemaMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { upload } from '../lib'
import {
  createImageController,
  createImageProfileController,
  createProfileController,
  deleteDocumentController,
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

imageRouter.post('/user/:id', upload.single('image'), createProfileController)

imageRouter.post(
  '/doc',
  verifyUserIsAuthenticated,
  upload.single('image'),
  createImageController,
)

imageRouter.delete(
  '/doc/:id',
  verifyUserIsAuthenticated,
  deleteDocumentController,
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
