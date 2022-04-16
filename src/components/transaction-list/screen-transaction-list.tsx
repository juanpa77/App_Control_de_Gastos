import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { transaction } from "../add-new-transaction/add-Transaction";
import { Modal } from "../modal/modal";
import { NavbarFilter } from "./filter-navbar";
import { CardTransaction } from "./transaction-item";
import { TransactionListDb } from "./transactionList";
import { ReactComponent as Edit } from "./icons/edit.svg";
import { ReactComponent as RecycleBin } from "./icons/recycle-bin.svg";
import { useNavigate } from "react-router-dom";

export const TransactionList = ({transactionList}: {transactionList: TransactionListDb})=> {
    const db = transactionList;
    
    const [filter, setFilter] = useState({type:'Expenses', toggle: false});
    const [listTransaction, setListTransaction] = useState<transaction[]>([]);
    const [selctedTransaction, setSelectedTransaction] = useState<transaction>();
    const [isOpenModal, openModal, closeModal] = useModal(false);
    const [isOpenModalConfirmation, openModalConfirmation, closeModalConfirmation] = useModal(false);

    const navigate = useNavigate();
    
    useEffect(()=> {
        db.get(filter.type).then(listExpenses=> setListTransaction(listExpenses))
        });

    const goToEdit = ()=> {
        navigate('../transaction', {state: selctedTransaction})
    }
    
    const classTriggerToggle = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        const classList = e.currentTarget.classList.length;        
        if (classList < 2) {
            setFilter({type: e.currentTarget.textContent === 'Gasto' ? 'Expenses': 'Income', toggle: !filter.toggle})
            }
       }
    
    const deleteTransaction = ()=>{
        db.db.deletTransaction(selctedTransaction!);
        closeModalConfirmation();
        closeModal();
    }
      
    return (
        <>
            <NavbarFilter classTriggerToggle={classTriggerToggle} toggle={filter.toggle} />
            <ol className="screen__trasactionList">
                {listTransaction.map((transaction, i)=> {
                    return (
                        <li className="card__transaction" 
                            key={i}>
                                <CardTransaction
                                    setTransaction={setSelectedTransaction}
                                    transaction={transaction} openModal={openModal} 
                                />
                        </li>
                    )
                })}
            </ol>
            <Modal isOpenModal={isOpenModal} closeModal={closeModal} >
                <div className="modal-menu">                    
                    <Edit className="modal-menu__edit" onClick={goToEdit}/> Editar
                    <RecycleBin className="modal-menu__delete" 
                        onClick={openModalConfirmation}
                        /> Eliminar
                </div>
                <Modal 
                    isOpenModal={isOpenModalConfirmation}
                    closeModal={closeModalConfirmation} >
                    <button className="btn-cancel" onClick={closeModalConfirmation}>Canelar</button>
                    <button className="btn-confirmation" onClick={deleteTransaction}>Confirmar</button>
                </Modal>
            </Modal>
        </>
    )


}