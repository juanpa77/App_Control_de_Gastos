import { useState, useEffect } from "react";
import { TransactionData } from "../../transaction-form/useTransaction";
import { TransactionListDb } from "../services/getTransactionList";

type Props = {
  db: TransactionListDb
  transactionType: boolean
  openModal: () => void
  filterMonth: number
  filterWeek: string
}

const useTransactionList = ({ db, transactionType, openModal, filterMonth, filterWeek }: Props) => {
  const filterType = transactionType ? 'Income' : 'Expenses'
  const [listTransaction, setListTransaction] = useState<TransactionData[]>([]);
  const formatFilterMonth = filterMonth < 10
    ? '0' + filterMonth.toString()
    : filterMonth.toString()

  useEffect(() => {
    let isActive = true
    db.get(formatFilterMonth, filterType, filterWeek).then((listExpenses) => {
      if (isActive) {
        setListTransaction(listExpenses)
      }
    })

    return () => { isActive = false }
  }, [transactionType, openModal, filterMonth, filterWeek])

  return [listTransaction] as const
}

export default useTransactionList
