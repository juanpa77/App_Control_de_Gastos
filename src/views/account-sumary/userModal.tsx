import { useNavigate } from "react-router-dom"
import { Base } from "../../components/buttons/styled"
import { Modal } from "../../components/modal/modal"
import { setLogOutUser } from "../../features/user/userSlice"
import { useAppDispatch } from "../../hooks/useAuth"
import { signOff } from "../../services/authProvider"

type Props = {
  isOpenModal: boolean
  closeModal: () => void
}

const UserModal = ({ isOpenModal, closeModal }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const closeSession = () => {
    dispatch(setLogOutUser)
    signOff().then(() => navigate('login'))
  }

  return (
    <Modal
      closeModal={closeModal}
      isOpenModal={isOpenModal}
    >
      <Base onClick={closeSession}>Cerrar sesion</Base>
    </Modal>
  )
}

export default UserModal