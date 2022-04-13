import './modal.css'

interface Props {
    children: JSX.Element
    isOpenModal: boolean
    closeModal: () =>void
}

export const Modal = ({children, isOpenModal, closeModal}: Props)=> {
    return (
        <div className={`modal ${isOpenModal&&'is-open'}`}>
            <div className="modal-container" onClick={closeModal}>
                {children}
                transaction exitosa
            </div> 
        </div>
    )
}