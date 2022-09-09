import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAuth";
import { deleteTransactionFirebase } from "../../../services/firebase/client";
import { splitDate } from "../../../utility/formatDate";
import { TransactionData } from "../../transaction-form/useTransaction";
import { TransactionListDb } from "../services/getTransactionList";

type Props = {
  db: TransactionListDb
  closeModalConfirmation: () => void
  closeModal: () => void
}

const useEditTransaction = ({ db, closeModal, closeModalConfirmation }: Props) => {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData>();
  const userToquen = useAppSelector(state => state.user.userToken)
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate("../transaction", { state: selectedTransaction });
  };

  const deleteTransaction = () => {
    const { month } = splitDate(selectedTransaction?.date!);
    deleteTransactionFirebase({ userToquen, transaction: selectedTransaction! })
    db.db.deletTransaction({ store: month, data: selectedTransaction! });
    closeModalConfirmation();
    closeModal();
  };

  return [setSelectedTransaction, goToEdit, deleteTransaction] as const
}

export default useEditTransaction
