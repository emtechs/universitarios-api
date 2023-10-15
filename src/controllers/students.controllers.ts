import { Request, Response } from 'express'
import {
  actionsStudentService,
  createStudentService,
  exportStudentService,
  importStudentAllService,
  importStudentService,
  listClassStudentService,
  listRecordService,
  listStudentService,
  resumeStudentService,
  retrieveStudentService,
  updateRecordService,
  updateStatusRecordService,
  updateStudentService,
} from '../services'

export const actionsStudentController = async (req: Request, res: Response) => {
  const student = await actionsStudentService(req.params.record_id)
  return res.json(student)
}

export const createStudentController = async (req: Request, res: Response) => {
  const student = await createStudentService(req.body, req.query)
  return res.status(201).json(student)
}

export const exportStudentController = async (req: Request, res: Response) => {
  const students = await exportStudentService()
  return res.json(students)
}

export const importStudentController = async (req: Request, res: Response) => {
  const students = await importStudentService(
    req.params.class_id,
    req.params.school_id,
    req.params.year_id,
    req.file,
  )
  return res.status(201).json(students)
}

export const importStudentAllController = async (
  req: Request,
  res: Response,
) => {
  const students = await importStudentAllService(req.file)
  return res.status(201).json(students)
}

export const listClassStudentController = async (
  req: Request,
  res: Response,
) => {
  const students = await listClassStudentService(req.query)
  return res.json(students)
}

export const listRecordController = async (req: Request, res: Response) => {
  const students = await listRecordService()
  return res.json(students)
}

export const listStudentController = async (req: Request, res: Response) => {
  const students = await listStudentService(req.query)
  return res.json(students)
}

export const resumeStudentController = async (req: Request, res: Response) => {
  const student = await resumeStudentService(req.params.year_id, req.query)
  return res.json(student)
}

export const retrieveStudentController = async (
  req: Request,
  res: Response,
) => {
  const student = await retrieveStudentService(req.params.id)
  return res.json(student)
}

export const updateRecordController = async (req: Request, res: Response) => {
  const student = await updateRecordService(req.body, req.params.key)
  return res.json(student)
}

export const updateStatusRecordController = async (
  req: Request,
  res: Response,
) => {
  const student = await updateStatusRecordService(
    req.body,
    req.params.key,
    req.user.id,
    req.query,
  )
  return res.json(student)
}

export const updateStudentController = async (req: Request, res: Response) => {
  const student = await updateStudentService(req.body, req.params.id)
  return res.json(student)
}
