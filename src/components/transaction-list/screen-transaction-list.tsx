import { ReactComponent as Edit } from "./icons/edit.svg";
import { ReactComponent as RecycleBin } from "./icons/recycle-bin.svg";
import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { TransactionData } from "../add-new-transaction/add-Transaction";
import { Modal } from "../modal/modal";
import { NavbarFilter } from "./filter-navbar";
import { CardTransaction } from "./transaction-item";
import { TransactionListDb } from "./transactionList";
import { useNavigate } from "react-router-dom";
import { splitDate } from "../../services/formatDate";

export const TransactionList = ({transactionList}: {transactionList: TransactionListDb})=> {
    const db = transactionList;
    const currentMonth = '0'+(new Date().getMonth()+1);

    const [filter, setFilter] = useState({type:'Expenses', toggle: false});
    const [listTransaction, setListTransaction] = useState<TransactionData[]>([]);
    const [selctedTransaction, setSelectedTransaction] = useState<TransactionData>();
    const [isOpenModal, openModal, closeModal] = useModal(false);
    const [isOpenModalConfirmation, openModalConfirmation, closeModalConfirmation] = useModal(false);
    const navigate = useNavigate();
    
    useEffect(()=> {
        db.get(currentMonth, filter.type).then(listExpenses=> setListTransaction(listExpenses))
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
        const [day, month] = splitDate(selctedTransaction?.date!)
        db.db.deletTransaction({store: month, data: selctedTransaction!});
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