import { formatDate } from "../utility/formatDate";
import { PrimaryButton } from "../style/primary-button"
import { ReactComponent as Send } from '../asset/icons/send.svg'
import { useState, MouseEvent, ChangeEvent } from "react"

type TransactionType = {
    type: any,
    amunt: number,
    date: string,
    category: string,
    description: string
}

export const Transaction = () => {
    const [toggle, setToggle] = useState(false);
    const [transaction, setTransaction] = useState({
        type: 'Gasto',
        amount: 0,
        date: formatDate(new Date()),
        category: '',
        description: ''
    })

    const sendTransaction = ()=> {
        console.log(transaction)
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
                type: toggle ? 'gasto' : 'ingreso'
            })
        }
    }
    
    return (
        <div className="layout__transaction">
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
            <PrimaryButton 
                handelClick={sendTransaction}
                text="Agregar"> 
                <Send></Send>
            </PrimaryButton>
        </div>        
    )
}