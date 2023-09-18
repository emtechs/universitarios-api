export const datePeriod = (date: string) => {
  const dateData = date.split('/')
  const date_time = new Date(`${dateData[2]}-${dateData[1]}-${dateData[0]}`)
  return {
    date_initial: { lte: date_time },
    date_final: { gte: date_time },
  }
}
