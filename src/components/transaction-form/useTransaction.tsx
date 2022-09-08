import { nanoid } from "nanoid";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useAppSelector } from '../../hooks/useAuth'
import { sendTransactionFirebase } from "../../services/firebase/client";
import { splitDate, formatDate } from "../../utility/formatDate";
import { Idb } from "../../utility/IDB";
import useToggle from "../buttons/toggle-btn/useToggle";

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
  const [toggle, triggerToggle] = useToggle()
  const [transaction, setTransaction] = useState<TransactionData>({
    id: editTransaction?.id || nanoid(10),
    type: editTransaction?.type || 'Expenses',
    amount: editTransaction?.amount || 0,
    date: editTransaction?.date || formatDate(new Date()),
    category: editTransaction?.category || "",
    description: editTransaction?.description || "",
  });

  const { month } = splitDate(transaction.date);
  const user = useAppSelector(state => state.user.userToken)

  db.openDB();
  useEffect(() => setTransaction({ ...transaction, type: toggle ? 'Income' : 'Expenses' }), [toggle])

  const addTrnsaction = (transaction: TransactionData) => {
    sendTransactionFirebase({ transaction, userToquen: user })
    db.addTransaction({ store: month, data: transaction })
  }

  const sendTransaction = (transaction: TransactionData, ev: FormEvent<HTMLButtonElement>) => {
    if (transaction.amount > 0) {
      editTransaction
        ? db.updateTransaction({ store: month, data: transaction })
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
  }

  return { triggerToggle, transaction, handleInputChange, sendTransaction, toggle }
}

export default useTransaction