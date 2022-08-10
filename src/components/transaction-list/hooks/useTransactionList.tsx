import { useState, useEffect } from "react";
import { Filters } from "..";
import { TransactionData } from "../../transaction-form/useTransaction";
import { TransactionListDb } from "../services/getTransactionList";

type Props = {
  db: TransactionListDb
  openModal: () => void
  filters: Filters
}

const useTransactionList = ({ db, openModal, filters }: Props) => {
  const [listTransaction, setListTransaction] = useState<TransactionData[]>([]);

  useEffect(() => {
    let isActive = true
    db.get(filters).then((listExpenses) => {
      if (isActive) {
        setListTransaction(listExpenses)
      }
    })

    return () => { isActive = false }
  }, [filters.type, openModal, filters.month, filters.week, filters.category])

  return [listTransaction] as const
}

export default useTransactionList
