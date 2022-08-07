import { splitDate } from "../../../utility/formatDate"
import { TransactionData } from "../../transaction-form/useTransaction"

const shortTransactionList = (listTransaction: TransactionData[]) => {
  return listTransaction.sort((a, b) => {
    const Aday = parseInt(splitDate(a.date).day)
    const Bday = parseInt(splitDate(b.date).day)
    return Bday - Aday
  })
}


export default shortTransactionList