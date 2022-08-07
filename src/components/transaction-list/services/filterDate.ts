import { splitDate } from "../../../utility/formatDate"
import { TransactionData } from "../../transaction-form/useTransaction"


const filterDate = (transaction: TransactionData, filterWeek: string, filterType: string) => {
  const day = splitDate(transaction.date).day
  const numberWeek = getWeek(day)
  return transaction.type === filterType && numberWeek === parseInt(filterWeek)
}

export const getWeek = (day: string | number) => {
  let week = 1
  typeof (day) === "string"
    ? week = Math.round(parseInt(day) / 7)
    : week = Math.round(day) / 7
  return week < 1
    ? 1
    : week
}

export default filterDate