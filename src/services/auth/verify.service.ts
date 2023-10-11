import { AppError } from '../../errors'
import { IAuthQuery, IRole } from '../../interfaces'
import {
  verifyClass,
  verifyClassYear,
  verifyFrequency,
  verifyStudent,
  verifyUser,
  verifyYear,
} from '../../scripts'

export const verifyService = async (
  role: IRole,
  {
    class_id,
    user_id,
    frequency_id,
    student_id,
    year_id,
    year,
    key_class,
  }: IAuthQuery,
) => {
  if (user_id) {
    if (role !== 'ADMIN') throw new AppError('Missing permissions', 401)

    return await verifyUser(user_id)
  }

  if (key_class) return await verifyClassYear(key_class)

  if (class_id) return await verifyClass(class_id)

  if (student_id) return await verifyStudent(student_id)

  if (frequency_id) return await verifyFrequency(frequency_id)

  if (year || year_id) return await verifyYear(year_id, year)
}
