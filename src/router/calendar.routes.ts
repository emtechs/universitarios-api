import { Router } from 'express'
import {
  validateSchemaMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  PeriodCreateSchema,
  PeriodUpdateSchema,
  YearCreateSchema,
} from '../schemas'
import {
  createPeriodController,
  createYearController,
  exportYearController,
  listCalendarController,
  listCalendarFrequencyController,
  listCalendarStudentController,
  listPeriodController,
  listYearController,
  retrievePeriodController,
  retrieveYearController,
  updatePeriodController,
} from '../controllers'

export const calendarRouter = Router()

calendarRouter.post(
  '/year',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(YearCreateSchema),
  createYearController,
)

calendarRouter.post(
  '/:year_id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(PeriodCreateSchema),
  createPeriodController,
)

calendarRouter.get(
  '/frequency/:year_id/:school_id/:class_id',
  verifyUserIsAuthenticated,
  listCalendarFrequencyController,
)

calendarRouter.get(
  '/student/:student_id',
  verifyUserIsAuthenticated,
  listCalendarStudentController,
)

calendarRouter.get('/period', verifyUserIsAuthenticated, listPeriodController)

calendarRouter.get(
  '/period/:period_id',
  verifyUserIsAuthenticated,
  retrievePeriodController,
)

calendarRouter.patch(
  '/period/:period_id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(PeriodUpdateSchema),
  updatePeriodController,
)

calendarRouter.get('/year', verifyUserIsAuthenticated, listYearController)

calendarRouter.get(
  '/year/:year',
  verifyUserIsAuthenticated,
  retrieveYearController,
)

calendarRouter.get(
  '/export/year',
  verifyUserIsAuthenticated,
  exportYearController,
)

calendarRouter.get(
  '/:year_id',
  verifyUserIsAuthenticated,
  listCalendarController,
)
