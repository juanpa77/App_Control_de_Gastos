import { db } from "./config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { TransactionData } from "../../components/transaction-form/useTransaction";
import { splitDate } from "../../utility/formatDate";

interface Data {
  userToquen: string | null | undefined
  transaction: TransactionData
}

export const sendTransactionFirebase = async ({ userToquen, transaction }: Data) => {
  const { month, year } = splitDate(transaction.date)
  const transactionRef = doc(db, 'users', userToquen!, 'year', year, 'month', month)
  await updateDoc(transactionRef, { transactions: arrayUnion(transaction) })
    .catch((error) => console.log(error))
}

/* export default {
  add: ({user, transaction}: Date) => {
    database
  }
} */