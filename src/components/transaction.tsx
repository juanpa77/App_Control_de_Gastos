import { PrimaryButton } from "../style/primary-button"
import { Input } from "./input"
import { CategorySelector } from "./selectInput"
import { SelectTransactionType } from "./selectTransaction"
import { ReactComponent as Send } from '../asset/icons/send.svg'

export const Transaction = () => {
    return (
        <div className="layout__transaction">
            <SelectTransactionType />        
            <Input inputType="number"/>
            <Input inputType="date"/>
            <CategorySelector />
            <textarea className="textarea__transaction" 
                placeholder="Ingrese una descripcion"></textarea>
            <PrimaryButton text="Agregar"> 
                <Send></Send>
            </PrimaryButton>
        </div>        
    )
}