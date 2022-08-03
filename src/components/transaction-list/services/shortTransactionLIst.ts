import { splitDate } from "../../../utility/formatDate"
import { TransactionData } from "../../transaction-form/useTransaction"

const shortTransactionList = (listTransaction: TransactionData[]) => {
  return listTransaction.sort((a, b) => {
    const Aday = parseInt(splitDate(a.date)[0])
    const Bday = parseInt(splitDate(b.date)[0])
    return Bday - Aday
  })
}


export default shortTransactionList