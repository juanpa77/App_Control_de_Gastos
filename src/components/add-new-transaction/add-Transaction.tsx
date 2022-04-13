import { ReactComponent as Check } from '../successful-transaction/check-icon.svg'
import { formatDate } from "../../utility/formatDate";
import { Idb } from "../../utility/IDB";
import { PrimaryButton } from "../primary-button"
import { ReactComponent as Send } from '../../asset/icons/send.svg'
import { useState, MouseEvent, ChangeEvent } from "react"
import { Link, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import { Modal } from '../successful-transaction/modal';
import { useModal } from '../../hooks/useModal';


export interface transaction { 
    id: string,
    type: string;
    amount: number;
    date: string;
    category: string;
    description: string;
}

export type TransactionType = {
    id: string,
    type: string,
    amount: number,
    date: string,
    category: string,
    description: string
}

export const Transaction = ({db}: {db: Idb}) => {
    const location = useLocation().state as transaction;
    const {isOpenModal, openModal, closeModal} = useModal(false)
    
    const [toggle, setToggle] = useState(false);
    const [transaction, setTransaction] = useState<TransactionType>({
        id: nanoid(10),
        type: location?.type || 'Gasto',
        amount: location?.amount || 0,
        date: location?.date || formatDate(new Date()),
        category: location?.category || '',
        description: location?.description || ''
    });
    console.log(transaction.id)
    
    db.openDB();
//-------Pending refactoring, split transaction component into add transaction, edit transaction and delete transaction components----//
// Test of refactorin 

    const upgradeTransaction = ()=> {
        
    }



    const sendTransaction = (transaction: TransactionType, ev:  React.FormEvent<HTMLButtonElement>)=> {
        if (transaction.amount > 0) {
            transaction.type === 'Gasto' ? db.addExpenses(transaction) : db.addIncome(transaction);
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
        if (classList < 2) {
            setToggle(!toggle)
            setTransaction({
                ...transaction,
                type: toggle ? 'Gasto' : 'Ingreso'
                })
            }
    }
    
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.currentTarget.reset();
        e.preventDefault();
        };
    
    return (
            <form className="layout__transaction"
            onSubmit={onFormSubmit}>
                <div className="select__radio">
                    <div 
                        className={`icome__radioButton ${toggle ? 'active__radioButton': ''}`}
                        onClick={(e)=>classTriggerToggle(e)}>
                            Ingreso
                    </div>
                    <div 
                        onClick={(e)=>classTriggerToggle(e)}
                        className= {`expense__radioButton ${toggle ? '': 'active__radioButton'}`}>
                        Gasto
                    </div>
                </div>
                <div className="inputAmount">
                    <input 
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
                    {/* <Link to={"../successful-transaction"}> */}
                <button type="submit" className="submit__none" 
                        onClick={(e)=> sendTransaction(transaction, e)}>
                    <PrimaryButton 
                        text= {location? "Guardar" : "Agregar"}>
                        <Send></Send>
                    </PrimaryButton>
                </button>
                    {/* </Link> */}
                <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
                    <Check />
                </Modal>
            </form>
        )
    }
