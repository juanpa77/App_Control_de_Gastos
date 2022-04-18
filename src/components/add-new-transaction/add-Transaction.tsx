import { ReactComponent as Check } from '../modal/check-icon.svg'
import { formatDate, splitDate } from "../../utility/formatDate";
import { Idb } from "../../utility/IDB";
import { PrimaryButton } from "../primary-button"
import { ReactComponent as Send } from '../../asset/icons/send.svg'
import { useState, MouseEvent, ChangeEvent, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/useModal';
import { LinkBack } from './link-to-back';
import { ToggleBtn } from '../toggle-btn';

export interface TransactionData { 
    id: string,
    type: string;
    amount: number;
    date: string;
    category: string;
    description: string;
}

export const Transaction = ({db}: {db: Idb}) => {
    const editTransactio = useLocation().state as TransactionData;
    const [isOpenModal, openModal, closeModal] = useModal(false)
    
    const [toggle, setToggle] = useState(false);
    const [transaction, setTransaction] = useState<TransactionData>({
        id: editTransactio?.id || nanoid(10),
        type: editTransactio?.type || 'Expenses',
        amount: editTransactio?.amount || 0,
        date: editTransactio?.date,
        category: editTransactio?.category || '',
        description: editTransactio?.description || ''
    });
    db.openDB();

    const sendTransaction = (transaction: TransactionData, ev:  React.FormEvent<HTMLButtonElement>)=> {
        const [day, month] = splitDate(transaction.date)
        if (transaction.amount > 0) {
            editTransactio? db.updateIncome({store: month, data: transaction}) : db.addIncome({store: month, data: transaction})
            ev.currentTarget.form?.reset();
            openModal();
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLTextAreaElement | HTMLSelectElement>)=> {
        setTransaction({
            ...transaction,
            [e.currentTarget.name] :e.currentTarget.value,
        })
    }

    const classTriggerToggle = (e: MouseEvent<HTMLDivElement>)=> {
        const classList = e.currentTarget.classList.length;        
        console.log(e.currentTarget.textContent)
        if (classList < 2) {
            setToggle(!toggle)
            setTransaction({
                ...transaction,
                type: toggle ? 'Expenses' : 'Income'
                })
            }
    }
    
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.currentTarget.reset();
        e.preventDefault();
        };

    useEffect(()=> {
        if (!editTransactio) {
            setTransaction({
                id: nanoid(10),
                type: 'Expenses',
                amount: 0,
                date: formatDate(new Date()),
                category: '',
                description:''
            })    
        }
    }, [isOpenModal])
    
    return (
        <>
            <form className={`layout__transaction ${isOpenModal&&'blur'}`}
            onSubmit={onFormSubmit}>
                <ToggleBtn classTriggerToggle={classTriggerToggle} toggle={toggle} />
                <div className="inputAmount">
                    <input 
                        autoFocus 
                        type="number"
                        placeholder="$999"
                        value={transaction.amount}
                        className="input__number"
                        onChange={(e)=>handleInputChange(e)}
                        name="amount" />
                </div>
                <input 
                    type="date"
                    defaultValue={transaction.date || formatDate(new Date())}
                    className="input__date"
                    onChange={(e)=>handleInputChange(e)}
                    name="date" />
                <select
                    defaultValue={transaction.category}
                    onChange={(e)=>handleInputChange(e)}
                    name="category" >
                    <option>Selecione una categoria</option>
                    <option>Option1</option>
                    <option>Option2</option>
                </select>
                <textarea 
                    className="textarea__transaction" 
                    placeholder="Ingrese una descripcion"
                    onChange={(e)=>handleInputChange(e)}
                    name="description" ></textarea>
                <button type="submit" className="submit__none" 
                        onClick={(e)=> sendTransaction(transaction, e)}>
                    <PrimaryButton 
                        text= {editTransactio? "Guardar" : "Agregar"}>
                        <Send></Send>
                    </PrimaryButton>
                </button>
            </form>
            <Modal isOpenModal={isOpenModal} closeModal={()=>closeModal
            } text={editTransactio? '' : 'transaction successful'}>
               {editTransactio=== null ? <Check /> : <LinkBack linkTo='/transaction-list' />} 
            </Modal>
        </>
        )
    }
