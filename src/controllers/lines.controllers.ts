import { Request, Response } from 'express'
import { listLineService } from '../services'

export const listLineController = async (req: Request, res: Response) => {
  const lines = await listLineService(req.query)
  return res.json(lines)
}
