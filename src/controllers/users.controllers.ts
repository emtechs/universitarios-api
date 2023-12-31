import { Request, Response } from 'express'
import {
  createUserService,
  listUserService,
  retrieveUserService,
  updateUserService,
  deleteUserService,
  retrieveUserWithCpfService,
  exportUserService,
  importUserService,
  dashUserService,
  profileUserService,
  pageUserService,
  documentsUserService,
  recordUserService,
  analystUserService,
  actionsUserService,
  isPendingUserService,
} from '../services'

export const actionsUserController = async (req: Request, res: Response) => {
  const user = await actionsUserService(req.user.id)
  return res.json(user)
}

export const analystUserController = async (req: Request, res: Response) => {
  const user = await analystUserService(req.user.id, req.params.period_id)
  return res.json(user)
}

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body, req.query)
  return res.status(201).json(user)
}

export const documentsUserController = async (req: Request, res: Response) => {
  const user = await documentsUserService(req.user.id, req.params.record_id)
  return res.json(user)
}

export const isPendingUserController = async (req: Request, res: Response) => {
  const user = await isPendingUserService(req.user.id, req.params.record_id)
  return res.json(user)
}

export const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService(req.query, req.user.id)
  return res.json(users)
}

export const pageUserController = async (req: Request, res: Response) => {
  const user = await pageUserService(req.user.id, req.query)
  return res.json(user)
}

export const recordUserController = async (req: Request, res: Response) => {
  const user = await recordUserService(req.params.record_id)
  return res.json(user)
}

export const retrieveUserController = async (req: Request, res: Response) => {
  const user = await retrieveUserService(req.params.id)
  return res.json(user)
}

export const retrieveUserWithCpfController = async (
  req: Request,
  res: Response,
) => {
  const user = await retrieveUserWithCpfService(req.params.cpf, req.query)
  return res.json(user)
}

export const profileUserController = async (req: Request, res: Response) => {
  const user = await profileUserService(req.user, req.query)
  return res.json(user)
}

export const importUserController = async (req: Request, res: Response) => {
  const users = await importUserService(req.file)
  return res.status(201).json(users)
}

export const exportUserController = async (req: Request, res: Response) => {
  const users = await exportUserService()
  return res.json(users)
}

export const dashUserController = async (req: Request, res: Response) => {
  const user = await dashUserService(req.params.year_id)
  return res.json(user)
}

export const updateUserController = async (req: Request, res: Response) => {
  const user = await updateUserService(req.params.id, req.body, req.user.role)
  return res.json(user)
}

export const updateUserAuthController = async (req: Request, res: Response) => {
  const user = await updateUserService(req.user.id, req.body, req.user.role)
  return res.json(user)
}

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.params.id)
  return res.status(204).json({})
}
