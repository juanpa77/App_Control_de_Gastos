import { db } from "./config";
import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { TransactionData } from "../../components/transaction-form/useTransaction";
import { formatMonth, splitDate } from "../../utility/formatDate";

interface Data {
  userToquen: string | null | undefined
  transaction: TransactionData
}

interface editData extends Data {
  editTransaction: TransactionData
}

const ref = {
  users: 'users',
  year: 'year',
  month: 'month'
}

export const sendTransactionFirebase = async ({ userToquen, transaction }: Data) => {
  const { month, year } = splitDate(transaction.date)
  const transactionRef = doc(db, ref.users, userToquen!, ref.year, year, ref.month, month)
  await updateDoc(transactionRef, {
    transactions: arrayUnion(transaction)
  })
    .catch((error) => console.log(error))
}

export const updateTransactionFirebase = async ({ userToquen, transaction, editTransaction }: editData) => {
  const { month, year } = splitDate(transaction.date)
  deleteTransactionFirebase({ userToquen, transaction: editTransaction })
  const transactionRef = doc(db, ref.users, userToquen!, ref.year, year, ref.month, month)
  await updateDoc(transactionRef, {
    transactions: arrayUnion(transaction)
  })
    .catch((error) => console.log(error))
}

export const deleteTransactionFirebase = async ({ userToquen, transaction }: Data) => {
  const { month, year } = splitDate(transaction.date)
  const transactionRef = doc(db, ref.users, userToquen!, ref.year, year, ref.month, month)
  await updateDoc(transactionRef, {
    transactions: arrayRemove(transaction)
  })
}

export const initDocs = async (userToquen: string) => {
  for (let year = 2022; year < 2024; year++) {
    for (let month = 1; month < 13; month++) {

      console.log(year, formatMonth(month))
      const docRef = doc(db, ref.users, userToquen!, ref.year, ref.month, formatMonth(month))
      await setDoc(docRef, {
        transactions: []
      })
    }
  }
}

// export const addCategoryFirebase = (cate)