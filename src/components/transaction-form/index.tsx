import { ReactComponent as Check } from "../../components/modal/check-icon.svg";
import { ReactComponent as Send } from "../../asset/icons/send.svg";
import { useModal } from "../../hooks/useModal"
import { formatDate } from "../../utility/formatDate"
import { Idb } from "../../utility/IDB"
import { LinkBack } from "../../views/add-new-transaction/link-to-back"
import { Modal } from "../modal/modal"
import { PrimaryButton } from "../primary-button"
import { Select } from "../select"
import { ToggleBtn } from "../toggle-btn"
import useTransaction from "./useTransaction";
import { Wrapper } from "./styled";

const TransactionForm = ({ db }: { db: Idb }) => {

  const [isOpenModal, openModal, closeModal] = useModal(false);
  const {
    onFormSubmit,
    triggerToggle,
    transaction,
    handleInputChange,
    sendTransaction,
    toggle,
    editTransactio
  } = useTransaction({ db, isOpenModal, openModal })

  return (
    <>
      <Wrapper isOpenModal={isOpenModal} onSubmit={onFormSubmit}>
        <ToggleBtn triggerToggle={triggerToggle} toggle={toggle} />
        <div className="inputAmount">
          <input
            autoFocus
            type="number"
            placeholder="$999"
            value={transaction.amount}
            className="input__number"
            onChange={(e) => handleInputChange(e)}
            name="amount"
          />
        </div>
        <input
          type="date"
          defaultValue={transaction.date || formatDate(new Date())}
          className="input__date"
          onChange={(e) => handleInputChange(e)}
          name="date"
        />
        <Select
          handleInputChange={(e) => handleInputChange(e)}
          defaultCategory={transaction.category}
        />
        <textarea
          className="textarea__transaction"
          placeholder="Ingrese una descripcion"
          onChange={(e) => handleInputChange(e)}
          name="description"
        ></textarea>
        <button
          type="submit"
          className="submit__none"
          onClick={(e) => sendTransaction(transaction, e)}
        >
          <PrimaryButton text={editTransactio ? "Guardar" : "Agregar"}>
            <Send></Send>
          </PrimaryButton>
        </button>
      </Wrapper>
      <Modal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        text={editTransactio ? "" : "transaction successful"}
      >
        {editTransactio === null
          ? <Check />
          : <LinkBack linkTo="/transaction-list" />
        }
      </Modal>
    </>
  )
}

export default TransactionForm