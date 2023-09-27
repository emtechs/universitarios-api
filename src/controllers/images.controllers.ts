import { Request, Response } from 'express'
import {
  createImageService,
  deleteImageService,
  listImageService,
  updateImageService,
} from '../services'

export const createImageController = async (req: Request, res: Response) => {
  const image = await createImageService(
    req.params.user_id,
    req.query,
    req.file,
  )
  return res.status(201).json(image)
}

export const listImageController = async (req: Request, res: Response) => {
  const images = await listImageService()

  return res.json(images)
}

export const updateImageController = async (req: Request, res: Response) => {
  const image = await updateImageService(req.params.id, req.file)
  return res.json(image)
}

export const deleteImageController = async (req: Request, res: Response) => {
  await deleteImageService(req.params.id)
  return res.status(204).json({})
}
