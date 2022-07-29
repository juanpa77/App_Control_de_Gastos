import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { splitDate } from "../../../utility/formatDate";
import { TransactionData } from "../../transaction-form/useTransaction";
import { TransactionListDb } from "../services/getTransactionList";

type Props = {
  db: TransactionListDb
  closeModalConfirmation: () => void
  closeModal: () => void
}

const useEditTransaction = ({ db, closeModal, closeModalConfirmation }: Props) => {
  const [selctedTransaction, setSelectedTransaction] = useState<TransactionData>();
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate("../transaction", { state: selctedTransaction });
  };

  const deleteTransaction = () => {
    // eslint-disable-next-line no-unused-vars
    const [day, month] = splitDate(selctedTransaction?.date!);
    db.db.deletTransaction({ store: month, data: selctedTransaction! });
    closeModalConfirmation();
    closeModal();
  };

  return [setSelectedTransaction, goToEdit, deleteTransaction] as const
}

export default useEditTransaction
