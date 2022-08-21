import { useState, useEffect } from "react";
// import { Filters } from "..";
import { TransactionData } from "../../transaction-form/useTransaction";
import { TransactionListDb } from "../services/getTransactionList";
import useFilterDate from "./useFilterDate";
import filterData from '../services/filterDate'

type Props = {
  db: TransactionListDb
  openModal: () => void
  toggle: boolean
}

const useTransactionList = ({ db, openModal, toggle }: Props) => {
  const [transactionsList, setTransactionsList] = useState<TransactionData[]>([])
  const [filteredTransactionsList, setFilteredTransactionsList] = useState<TransactionData[]>(transactionsList)
  const filters = useFilterDate(toggle)

  useEffect(() => {
    let isActive = true
    db.get(filters.month).then((listExpenses) => {
      if (isActive) {
        setTransactionsList(listExpenses)
      }
    })

    return () => { isActive = false }
  }, [openModal, filters.month])

  useEffect(() => {
    setFilteredTransactionsList(filterData(transactionsList, filters))
    console.log(transactionsList)
  }, [filters])

  return [filteredTransactionsList] as const
}

export default useTransactionList
