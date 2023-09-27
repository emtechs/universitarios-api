import { Router } from 'express'
import { verifyIsAdmin, verifyUserIsAuthenticated } from '../middlewares'
import { upload } from '../lib'
import {
  createImageController,
  deleteImageController,
  listImageController,
  updateImageController,
} from '../controllers'

export const imageRouter = Router()

imageRouter.post(
  '/user/:user_id',
  upload.single('image'),
  createImageController,
)

imageRouter.get('', verifyUserIsAuthenticated, listImageController)

imageRouter.patch(
  '/:id',
  verifyUserIsAuthenticated,
  upload.single('image'),
  updateImageController,
)

imageRouter.delete(
  '/:id',
  verifyUserIsAuthenticated,
  verifyIsAdmin,
  deleteImageController,
)
