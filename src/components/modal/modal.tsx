import { ReactComponent as Close } from "./close.svg";


import { ReactNode } from 'react';
import './modal.css';

interface Props {
    children: ReactNode
    isOpenModal: boolean
    closeModal: () =>void
    text?: string
    className?: string
}

export const Modal = ({children, isOpenModal, closeModal, text, className}: Props)=> {
    return (
        <div className={`modal ${className} ${isOpenModal&&'is-open'}`}>
                <div className="modal-container">
                    <Close className="modal-menu__close" onClick={closeModal} />
                    {children}
                    {text}
                </div> 
        </div>
    )
}