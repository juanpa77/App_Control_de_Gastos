import { formatDate } from "../../utility/formatDate";
import { Idb } from "../../utility/IDB";
import { PrimaryButton } from "../primary-button"
import { ReactComponent as Send } from '../../asset/icons/send.svg'
import { useState, MouseEvent, ChangeEvent } from "react"
import { useLocation } from "react-router-dom";


interface transaction { 
    type: string;
    amount: number;
    date: string;
    category: string;
    description: string;
}

export type TransactionType = {
    type: string,
    amount: number,
    date: string,
    category: string,
    description: string
}

export const Transaction = ({db}: {db: Idb}) => {
    const location = useLocation().state as transaction;

    const [toggle, setToggle] = useState(false);
    const [transaction, setTransaction] = useState<TransactionType>({
        type: location?.type || 'Gasto',
        amount: location?.amount || 0,
        date: location?.date || formatDate(new Date()),
        category: location?.category || '',
        description: location?.description || ''
    });
    db.openDB();

    const sendTransaction = (transaction: TransactionType, ev:  React.FormEvent<HTMLButtonElement>)=> {
        if (transaction.amount > 0) {
            transaction.type === 'Gasto' ? db.addExpenses(transaction) : db.addIncome(transaction);
            ev.currentTarget.form?.reset()
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
    
    return (
            <form className="layout__transaction">
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
                <button type="submit" className="submit__none" 
                        onClick={(e)=> {sendTransaction(transaction, e)
                            e.currentTarget.form?.reset()
                        }}>
                    <PrimaryButton 
                        text= {location? "Guardar" : "Agregar"}>
                        <Send></Send>
                    </PrimaryButton>
                </button>
            </form>
        )
    }
