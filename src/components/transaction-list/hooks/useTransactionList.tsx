import { useState, useEffect } from "react";
import { TransactionData } from "../../transaction-form/useTransaction";
import { TransactionListDb } from "../transactionList";

type Props = {
  db: TransactionListDb
  toggle: boolean
}

const useTransactionList = ({ db, toggle }: Props) => {
  const currentMonth = "0" + (new Date().getMonth() + 1);
  const filter = toggle ? 'Income' : 'Expenses'
  const [listTransaction, setListTransaction] = useState<TransactionData[]>([]);
  let isActive = true

  useEffect(() => {
    db.get(currentMonth, filter).then((listExpenses) => {
      if (isActive) {
        setListTransaction(listExpenses)
      }
    })

    return () => { isActive = false }
  });

  return [listTransaction] as const
}

export default useTransactionList
