import { nanoid } from "nanoid";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useAppSelector } from '../../hooks/useAuth'
import { sendTransactionFirebase, updateTransactionFirebase } from "../../services/firebase/client";
import { splitDate, formatDate } from "../../utility/formatDate";
import { Idb } from "../../utility/IDB";
import useFilterDate from "../transaction-list/hooks/useFilterDate";
import { sharingFilter } from "../transaction-list/services/sharing-filter";

export interface TransactionData {
  id: string;
  type: string;
  amount: number;
  date: string;
  category: string;
  description: string;
}

type Props = {
  db: Idb
  editTransaction: TransactionData
  openModal: () => void
}

type InputChange = ChangeEvent<
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLTextAreaElement
  | HTMLSelectElement
>


const useTransaction = ({ db, openModal, editTransaction }: Props) => {
  const [transaction, setTransaction] = useState<TransactionData>({
    id: editTransaction?.id || nanoid(10),
    type: editTransaction?.type || 'Expenses',
    amount: editTransaction?.amount || 0,
    date: editTransaction?.date || formatDate(new Date()),
    category: editTransaction?.category || "",
    description: editTransaction?.description || "",
  });

  const filter = useFilterDate()
  const sucriptionToggle = sharingFilter.getSubject
  const { month } = splitDate(transaction.date);
  const userToquen = useAppSelector(state => state.user.userToken)
  db.openDB();


  const addTrnsaction = (transaction: TransactionData) => {
    sendTransactionFirebase({ transaction, userToquen })
    db.addTransaction({ store: month, data: transaction })
  }

  const updateTransaction = (transaction: TransactionData) => {
    updateTransactionFirebase({ transaction, userToquen, editTransaction })
    db.updateTransaction({ store: month, data: transaction })
  }

  const sendTransaction = (transaction: TransactionData, ev: FormEvent<HTMLButtonElement>) => {
    if (transaction.amount > 0) {
      editTransaction
        ? updateTransaction(transaction)
        : addTrnsaction(transaction);
      ev.currentTarget.form?.reset();
      openModal();
      restForm()
    }
  };

  const handleInputChange = (e: InputChange) => {
    setTransaction({
      ...transaction,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const restForm = () => {
    if (!editTransaction) {
      setTransaction({
        id: nanoid(10),
        type: "Expenses",
        amount: 0,
        date: formatDate(new Date()),
        category: "",
        description: "",
      });
    }

    useEffect(() => {
      let isActive = true
      sucriptionToggle.subscribe((filters) => {
        if (isActive) {
          setTransaction({
            ...transaction,
            type: filters.type
          })
        }
      })

      return (() => { isActive = false })
    }, [filter.type])
  }

  return { transaction, handleInputChange, sendTransaction }
}

export default useTransaction