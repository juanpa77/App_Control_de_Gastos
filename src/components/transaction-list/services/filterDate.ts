import { Filters } from ".."
import { splitDate } from "../../../utility/formatDate"
import { TransactionData } from "../../transaction-form/useTransaction"


const transactionFilter = (transaction: TransactionData, filters: Filters) => {
  const result = true
  if (transaction.type !== filters.type) return false
  if (filters.category !== 'todas' && filters.category !== transaction.category) return false
  if (filters.week !== 'todas' && getWeek(splitDate(transaction.date).day) !== filters.week) return false
  return result
}

const filterDate = (data: TransactionData[], filters: Filters) => {
  return data.filter((transaction) => transactionFilter(transaction, filters))
}


export const getMonth = (filter: string, listTransaction: TransactionData[]) => {
  listTransaction.filter(transaction => transaction.category === filter)
}

export const getWeek = (selectedDay: string | number) => {
  let week = 1
  typeof (selectedDay) === "string"
    ? week = Math.round(parseInt(selectedDay) / 7)
    : week = Math.round(selectedDay) / 7
  console.log(week)
  return week < 1
    ? '1'
    : week.toString()
}

export default filterDate