import { useState, useEffect } from "react";
import { TransactionData } from "../../transaction-form/useTransaction";
import { TransactionListDb } from "../services/getTransactionList";

type Props = {
  db: TransactionListDb
  transactionType: boolean
  openModal: () => void
}

const useTransactionList = ({ db, transactionType, openModal }: Props) => {
  const currentMonth = "0" + (new Date().getMonth() + 1);
  const filter = transactionType ? 'Income' : 'Expenses'
  const [listTransaction, setListTransaction] = useState<TransactionData[]>([]);

  useEffect(() => {
    let isActive = true
    db.get(currentMonth, filter).then((listExpenses) => {
      if (isActive) {
        setListTransaction(listExpenses)
        console.log('render')
      }
    })

    return () => { isActive = false }
  }, [transactionType, openModal])

  return [listTransaction] as const
}

export default useTransactionList
