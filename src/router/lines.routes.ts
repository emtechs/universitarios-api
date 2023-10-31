import { Router } from 'express'
import { listLineController } from '../controllers'
import { verifyUserIsAuthenticated } from '../middlewares'

export const lineRouter = Router()

lineRouter.get('', verifyUserIsAuthenticated, listLineController)
