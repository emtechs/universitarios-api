import { Request, Response } from 'express'
import {
  createImageProfileService,
  createImageService,
  deleteDocumentService,
  deleteImageService,
  updateImageService,
  updateStatusImageService,
} from '../services'

export const createImageController = async (req: Request, res: Response) => {
  const image = await createImageService(req.user.id, req.query, req.file)
  return res.status(201).json(image)
}

export const createProfileController = async (req: Request, res: Response) => {
  const image = await createImageService(req.params.id, req.query, req.file)
  return res.status(201).json(image)
}

export const createImageProfileController = async (
  req: Request,
  res: Response,
) => {
  const image = await createImageProfileService(req.user.id, req.file)
  return res.status(201).json(image)
}

export const deleteDocumentController = async (req: Request, res: Response) => {
  await deleteDocumentService(req.params.id)
  return res.status(204).json({})
}

export const deleteImageController = async (req: Request, res: Response) => {
  await deleteImageService(req.params.id)
  return res.status(204).json({})
}

export const updateImageController = async (req: Request, res: Response) => {
  const image = await updateImageService(req.params.id, req.file)
  return res.json(image)
}

export const updateStatusImageController = async (
  req: Request,
  res: Response,
) => {
  const image = await updateStatusImageService(
    req.body,
    req.params.id,
    req.user.id,
  )
  return res.json(image)
}
