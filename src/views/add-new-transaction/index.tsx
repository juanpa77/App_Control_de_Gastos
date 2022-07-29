import { useLocation } from 'react-router-dom';
import { ReactComponent as Check } from '../../components/modal/check-icon.svg'
import { Modal } from "../../components/modal/modal";
import TransactionForm from "../../components/transaction-form"
import { Wrapper } from '../../components/transaction-form/styled';
import { TransactionData } from '../../components/transaction-form/useTransaction';
import { useModal } from "../../hooks/useModal";
import { Idb } from "../../utility/IDB"
import { LinkBack } from './link-to-back';

const NewTransaction = ({ db }: { db: Idb }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const editTransactio = useLocation().state as TransactionData;

  return (
    <>
      <Wrapper isOpenModal={isOpenModal} onSubmit={(e) => e.preventDefault()}>
        <TransactionForm openModal={openModal} editTransaction={editTransactio} db={db} />
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

export default NewTransaction