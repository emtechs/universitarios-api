import { AppError } from '../../errors'
import { IAuthQuery, IRequestUser } from '../../interfaces'
import {
  verifyClass,
  verifyClassYear,
  verifyFrequency,
  verifyRecord,
  verifyStudent,
  verifyUser,
  verifyYear,
} from '../../scripts'

export const verifyService = async (
  { id, role }: IRequestUser,
  {
    class_id,
    user_id,
    frequency_id,
    student_id,
    year_id,
    year,
    key_class,
    record_id,
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

  if (record_id) return await verifyRecord(record_id, id)
}
