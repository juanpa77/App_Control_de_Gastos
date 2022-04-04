import { formatDate } from "../utility/formatDate";
import { Idb } from "../utility/IDB";
import { PrimaryButton } from "./primary-button"
import { ReactComponent as Send } from '../asset/icons/send.svg'
import { useState, MouseEvent, ChangeEvent } from "react"

export type TransactionType = {
    type: string,
    amount: number,
    date: Date | string,
    category: string,
    description: string
}

export const Transaction = (props: { db: Idb; }) => {
    const {db} = props;
    const [toggle, setToggle] = useState(false);
    const [transaction, setTransaction] = useState<TransactionType>({
        type: 'Gasto',
        amount: 0,
        date: formatDate(new Date()),
        category: '',
        description: ''
    })
    db.openDB();

    const sendTransaction = (transaction: TransactionType)=> {
        if (transaction.amount > 0) {
            transaction.type === 'Gasto' ? db.addExpenses(transaction) : db.addIncome(transaction); 
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> |
        ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>)=> {
        setTransaction({
            ...transaction,
            [e.currentTarget.name] :e.currentTarget.value,
        })
    }

    const triggerToggle = (e: MouseEvent<HTMLDivElement>)=> {
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
            <form className="layout__transaction"
                onSubmit={(e)=>{
                    e.preventDefault()
                    e.currentTarget.reset()
                    }}>
                <div className="select__radio">
                    <div 
                        className={`icome__radioButton ${toggle ? 'active__radioButton': ''}`}
                        onClick={(e)=>triggerToggle(e)}>
                            Ingreso
                    </div>
                    <div 
                        onClick={(e)=>triggerToggle(e)}
                        className= {`expense__radioButton ${toggle ? '': 'active__radioButton'}`}>
                        Gasto
                    </div>
                </div>
                <input 
                    type="number"
                    placeholder="$999"
                    className="input__number"
                    onChange={(e)=>handleInputChange(e)}
                    name="amount" />
                <input 
                    type="date"
                    defaultValue={formatDate(new Date())}
                    className="input__date"
                    onChange={(e)=>handleInputChange(e)}
                    name="date" />
                <select
                    onChange={(e)=>handleInputChange(e)}
                    name="category" >
                    <option>Selecione una categoria</option>
                    <option>Option1</option>
                    <option>Option1</option>
        </select>
                <textarea 
                    className="textarea__transaction" 
                    placeholder="Ingrese una descripcion"
                    onChange={(e)=>handleInputChange(e)}
                    name="description" ></textarea>
                <button type="submit" className="submit__none">
                    <PrimaryButton 
                        transaction={transaction}
                        handelClick={sendTransaction}
                        text="Agregar"> 
                        <Send></Send>
                    </PrimaryButton>
                </button>
            </form>
    )
}