import { ReactComponent as Edit } from "./icons/edit.svg";
import { ReactComponent as RecycleBin } from "./icons/recycle-bin.svg";
import { Modal } from "../../components/modal/modal"
import TransactionList from "../../components/transaction-list"
import { TransactionListDb } from "../../components/transaction-list/transactionList"
import { useModal } from "../../hooks/useModal"
import useEditTransaction from "../../components/transaction-list/hooks/useEditTransaction";

type Props = {
  db: TransactionListDb
}

const ShowTransactions = ({ db }: Props) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalConfirmation, openModalConfirmation, closeModalConfirmation,] = useModal(false);
  const [setSelectedTransaction, goToEdit, deleteTransaction] = useEditTransaction({ db, closeModal, closeModalConfirmation })

  return (
    <>
      <TransactionList
        db={db}
        openModal={openModal}
        setSelectedTransaction={setSelectedTransaction}
      />
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
  )
}

export default ShowTransactions