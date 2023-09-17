import { Router } from 'express'
import { verifyUserIsAuthenticated } from '../middlewares'
import { upload } from '../lib'
import {
  createImageAuthProfileController,
  createImageProfileController,
  deleteImageController,
} from '../controllers'

export const imageRouter = Router()

imageRouter.post(
  '/user',
  verifyUserIsAuthenticated,
  upload.single('image'),
  createImageAuthProfileController,
)

imageRouter.post(
  '/user/:user_id',
  upload.single('image'),
  createImageProfileController,
)

imageRouter.delete('/:id', verifyUserIsAuthenticated, deleteImageController)
