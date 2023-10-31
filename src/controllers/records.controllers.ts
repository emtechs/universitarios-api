import { Request, Response } from 'express'
import {
  actionsRecordService,
  createLineRecordService,
  deleteLineRecordService,
  documentsRecordService,
  isPendingRecordService,
  lineRecordService,
  listRecordService,
  retrieveRecordService,
  updateRecordService,
  updateStatusRecordService,
} from '../services'

export const actionsRecordController = async (req: Request, res: Response) => {
  const student = await actionsRecordService(req.params.record_id)
  return res.json(student)
}

export const createLineRecordController = async (
  req: Request,
  res: Response,
) => {
  const line = await createLineRecordService(req.body, req.params.record_id)
  return res.json(line)
}

export const deleteLineRecordController = async (
  req: Request,
  res: Response,
) => {
  await deleteLineRecordService(req.params.record_id, req.params.line_id)
  return res.status(204).json({})
}

export const documentsRecordController = async (
  req: Request,
  res: Response,
) => {
  const user = await documentsRecordService(req.params.record_id)
  return res.json(user)
}

export const isPendingRecordController = async (
  req: Request,
  res: Response,
) => {
  const user = await isPendingRecordService(req.params.record_id)
  return res.json(user)
}

export const lineRecordController = async (req: Request, res: Response) => {
  const line = await lineRecordService(req.params.record_id, req.query)
  return res.json(line)
}

export const listRecordController = async (req: Request, res: Response) => {
  const students = await listRecordService(req.query)
  return res.json(students)
}

export const retrieveRecordController = async (req: Request, res: Response) => {
  const student = await retrieveRecordService(req.params.record_id)
  return res.json(student)
}

export const updateRecordController = async (req: Request, res: Response) => {
  const student = await updateRecordService(req.body, req.params.record_id)
  return res.json(student)
}

export const updateStatusRecordController = async (
  req: Request,
  res: Response,
) => {
  const student = await updateStatusRecordService(
    req.body,
    req.params.record_id,
    req.user.id,
    req.query,
  )
  return res.json(student)
}
