import { Router } from 'express'
import { verifyUserIsAuthenticated } from '../middlewares'
import { upload } from '../lib'
import {
  createImageController,
  createImageProfileController,
  deleteImageController,
} from '../controllers'

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
