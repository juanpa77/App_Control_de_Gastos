import { Base } from "../../components/buttons/styled"
import { Modal } from "../../components/modal/modal"
import { signOff } from "../../services/authProvider"

type Props = {
  isOpenModal: boolean
  closeModal: () => void
}

const UserModal = ({ isOpenModal, closeModal }: Props) => {
  return (
    <Modal
      closeModal={closeModal}
      isOpenModal={isOpenModal}
    >
      <Base onClick={signOff}>Cerrar sesion</Base>
    </Modal>
  )
}

export default UserModal