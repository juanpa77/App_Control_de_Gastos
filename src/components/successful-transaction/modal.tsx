import { Link } from 'react-router-dom'
import './modal.css'

interface Props {
    children: JSX.Element
    isOpenModal: boolean
    closeModal: () =>void
    text?: string
}

export const Modal = ({children, isOpenModal, closeModal, text}: Props)=> {
    return (
        <div className={`modal ${isOpenModal&&'is-open'}`}>
            <Link to={'/transaction'}>
                <div className="modal-container" onClick={closeModal}>
                    {children}
                    {text}
                </div> 
            </Link>
        </div>
    )
}