import { ReactComponent as Edit } from "./icons/edit.svg";
import { ReactComponent as RecycleBin } from "./icons/recycle-bin.svg";
import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../modal/modal";
import { NavbarFilter } from "./filter-navbar";
import { CardTransaction } from "./transaction-item";
import { TransactionListDb } from "./transactionList";
import { useNavigate } from "react-router-dom";
import { splitDate } from "../../utility/formatDate";
import { TransactionData } from "../transaction-form/useTransaction";
import useToggle from "../toggle-btn/useToggle";

type Props = {
  transactionList: TransactionListDb;
}

export const TransactionList = ({ transactionList }: Props) => {
  const db = transactionList;
  const currentMonth = "0" + (new Date().getMonth() + 1);
  const [toggle, triggerToggle] = useToggle()
  // const [filter, setFilter] = useState({ type: "Expenses", toggle: false });
  const filter = toggle ? 'Income' : 'Expenses'
  const [listTransaction, setListTransaction] = useState<TransactionData[]>([]);
  const [selctedTransaction, setSelectedTransaction] =
    useState<TransactionData>();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [
    isOpenModalConfirmation,
    openModalConfirmation,
    closeModalConfirmation,
  ] = useModal(false);
  const navigate = useNavigate();

  useEffect(() => {
    db.get(currentMonth, filter).then((listExpenses) =>
      setListTransaction(listExpenses)
    );
  });

  const goToEdit = () => {
    navigate("../transaction", { state: selctedTransaction });
  };


  const deleteTransaction = () => {
    const [day, month] = splitDate(selctedTransaction?.date!);
    db.db.deletTransaction({ store: month, data: selctedTransaction! });
    closeModalConfirmation();
    closeModal();
  };

  return (
    <>
      <NavbarFilter
        triggerToggle={triggerToggle}
        toggle={toggle}
      />
      <ol className="screen__trasactionList">
        {listTransaction.map((transaction, i) => {
          return (
            <li className="card__transaction" key={i}>
              <CardTransaction
                setTransaction={setSelectedTransaction}
                transaction={transaction}
                openModal={openModal}
              />
            </li>
          );
        })}
      </ol>
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <div className="modal-menu">
          <Edit className="modal-menu__edit" onClick={goToEdit} /> Editar
          <RecycleBin
            className="modal-menu__delete"
            onClick={openModalConfirmation}
          />{" "}
          Eliminar
        </div>
        <Modal
          isOpenModal={isOpenModalConfirmation}
          closeModal={closeModalConfirmation}
        >
          <button className="btn-cancel" onClick={closeModalConfirmation}>
            Canelar
          </button>
          <button className="btn-confirmation" onClick={deleteTransaction}>
            Confirmar
          </button>
        </Modal>
      </Modal>
    </>
  );
};
