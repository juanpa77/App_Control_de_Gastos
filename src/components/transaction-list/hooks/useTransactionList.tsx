import { useState, useEffect } from "react";
import { TransactionData } from "../../transaction-form/useTransaction";
import { TransactionListDb } from "../services/getTransactionList";

type Props = {
  db: TransactionListDb
  transactionType: boolean
  openModal: () => void
  filterMonth: number
}

const useTransactionList = ({ db, transactionType, openModal, filterMonth }: Props) => {
  const filterType = transactionType ? 'Income' : 'Expenses'
  const [listTransaction, setListTransaction] = useState<TransactionData[]>([]);
  const formatFilterMonth = filterMonth < 10
    ? '0' + filterMonth.toString()
    : filterMonth.toString()

  useEffect(() => {
    console.log(formatFilterMonth)
    let isActive = true
    db.get(formatFilterMonth, filterType).then((listExpenses) => {
      if (isActive) {
        setListTransaction(listExpenses)
        console.log('render')
      }
    })

    return () => { isActive = false }
  }, [transactionType, openModal, filterMonth])

  return [listTransaction] as const
}

export default useTransactionList
