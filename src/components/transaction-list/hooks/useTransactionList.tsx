import { useState, useEffect } from "react";
import { TransactionData } from "../../transaction-form/useTransaction";
import { TransactionListDb } from "../services/getTransactionList";
import useFilterDate from "./useFilterDate";
import filterData from '../services/filterDate'

type Props = {
  db: TransactionListDb
  openModal: () => void
}

const useTransactionList = ({ db, openModal }: Props) => {
  const [load, setLoad] = useState(true)
  const [transactionsList, setTransactionsList] = useState<TransactionData[]>([])
  const [filteredTransactionsList, setFilteredTransactionsList] = useState<TransactionData[]>([])

  const filters = useFilterDate()

  useEffect(() => { if (transactionsList.length === 0) setLoad(false) })

  useEffect(() => {
    let isActive = true

    db.get(filters.month).then((transactions) => {
      if (isActive) {
        setTransactionsList(transactions)
      }
    })

    return () => { isActive = false }
  }, [openModal, filters.month, load])

  useEffect(() => {
    transactionsList && setFilteredTransactionsList(filterData(transactionsList, filters))
  }, [filters, transactionsList])

  return [filteredTransactionsList] as const
}

export default useTransactionList
