import { useState, useEffect } from "react";
import { Filters } from "..";
import { TransactionData } from "../../transaction-form/useTransaction";
import { TransactionListDb } from "../services/getTransactionList";
import { sharingFilter } from "../services/sharing-filter";

type Props = {
  db: TransactionListDb
  openModal: () => void
  filters: Filters
}

const useTransactionList = ({ db, openModal, filters }: Props) => {
  const [listTransaction, setListTransaction] = useState<TransactionData[]>([]);
  const subcritpionFilter = sharingFilter.getSubject
  useEffect(() => {
    let isActive = true
    subcritpionFilter.subscribe(filte => console.log(filte))
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
