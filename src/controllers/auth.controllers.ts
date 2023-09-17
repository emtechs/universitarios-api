import { Request, Response } from 'express'
import {
  updatePasswordService,
  sendEmailRecoveryService,
  createSessionService,
  verifyService,
  verifyCpfService,
  registerService,
} from '../services'

export const createSessionController = async (req: Request, res: Response) => {
  const token = await createSessionService(req.body)

  return res.status(201).json(token)
}

export const registerController = async (req: Request, res: Response) => {
  const token = await registerService(req.body)

  return res.status(201).json(token)
}

export const updatePasswordController = async (req: Request, res: Response) => {
  const user = await updatePasswordService(
    req.body,
    req.params.userId,
    req.params.token,
  )

  return res.status(200).json(user)
}

export const sendEmailToRecovery = async (req: Request, res: Response) => {
  const user = await sendEmailRecoveryService(req.body)

  return res.status(200).json(user)
}

export const verifyController = async (req: Request, res: Response) => {
  const verify = await verifyService(req.user, req.query)

  return res.json(verify)
}

export const verifyCpfController = async (req: Request, res: Response) => {
  const verify = await verifyCpfService(req.params.cpf)

  return res.json(verify)
}
