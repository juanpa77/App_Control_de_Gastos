import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { transaction } from "../add-new-transaction/add-Transaction";
<<<<<<< HEAD
import { Modal } from "../modal/modal";
=======
>>>>>>> 824174adb5c37e93c58006ebe05080c0e17a16e5
import { NavbarFilter } from "./filter-navbar";
import { CardTransaction } from "./transaction-item";
import { TransactionListDb } from "./transactionList";
import { ReactComponent as Edit } from "./icons/edit.svg";
import { ReactComponent as RecycleBin } from "./icons/recycle-bin.svg";
import { useNavigate } from "react-router-dom";

export const TransactionList = ({transactionList}: {transactionList: TransactionListDb})=> {
    const db = transactionList;
<<<<<<< HEAD
    
    const [filter, setFilter] = useState({type:'Expenses', toggle: false});
    const [listTransaction, setListTransaction] = useState<transaction[]>([]);
    const [selctedTransaction, setSelectedTransaction] = useState<transaction>();
    const [isOpenModal, openModal, closeModal] = useModal(false);
    const [isOpenModalConfirmation, openModalConfirmation, closeModalConfirmation] = useModal(false);

    const navigate = useNavigate();
=======
    const [filter, setFilter] = useState({type:'Expenses', toggle: false});
    const [listTransaction, setListTransaction] = useState<transaction[]>([])
>>>>>>> 824174adb5c37e93c58006ebe05080c0e17a16e5
    
    useEffect(()=> {
        db.get(filter.type).then(listExpenses=> setListTransaction(listExpenses))
        });

<<<<<<< HEAD
    const goToEdit = ()=> {
        navigate('../transaction', {state: selctedTransaction})
    }
    
=======
>>>>>>> 824174adb5c37e93c58006ebe05080c0e17a16e5
    const classTriggerToggle = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        const classList = e.currentTarget.classList.length;        
        if (classList < 2) {
            setFilter({type: e.currentTarget.textContent === 'Gasto' ? 'Expenses': 'Income', toggle: !filter.toggle})
            }
       }
<<<<<<< HEAD
    
    const deleteTransaction = ()=>{
        db.db.deletTransaction(selctedTransaction!);
        closeModalConfirmation();
        closeModal();
    }
       
=======
>>>>>>> 824174adb5c37e93c58006ebe05080c0e17a16e5
    return (
        <>
            <NavbarFilter classTriggerToggle={classTriggerToggle} toggle={filter.toggle} />
            <ol className="screen__trasactionList">
                {listTransaction.map((transaction, i)=> {
                    return (
                        <li className="card__transaction" 
<<<<<<< HEAD
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
=======
                            key={i}><CardTransaction
                                id={transaction.id}
                                amount={transaction.amount}
                                date={transaction.date}
                                category={transaction.category} 
                                type={""} 
                                description={""}/>
                        </li>)
                })}
            </ol>
>>>>>>> 824174adb5c37e93c58006ebe05080c0e17a16e5
        </>
    )


}