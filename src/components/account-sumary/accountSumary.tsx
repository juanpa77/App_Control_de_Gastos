import { ReactComponent as Config } from "./assets/config.svg";
import { Idb } from "../../utility/IDB";
import { Balance } from "./cardBalanse"
import { Modal } from "../modal/modal";
import { useModal } from "../../hooks/useModal";


export const AccountSumary = (props: { db: Idb; })=> {
  const {db} = props;
  const [isOpneModal, openModal, closeModal] = useModal();

    return (
        <div className="accountSumary">
            <div className="accountSumary__footer">
                <div className="accountSumary__title">
                    <h2>Estado de Cuenta</h2>
                </div>
                <Config onClick={openModal}/>
            </div>
            <Balance db={db} dateRanges='Mensual' />
            <Balance db={db} dateRanges='Semanal' />
            <Balance db={db} dateRanges='Diario' />      
            <Modal className="config" isOpenModal={isOpneModal} closeModal={closeModal}>

            </Modal>
        </div>
    )
}