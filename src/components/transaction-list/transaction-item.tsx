
import { TransactionType } from '../add-new-transaction/add-Transaction'
import { ReactComponent as EditIcon } from './icons/editIcon.svg'
interface Props {
    transaction: TransactionType
    openModal: ()=> void
    setTransaction: React.Dispatch<React.SetStateAction<TransactionType | undefined>>
}

export const CardTransaction = ({transaction, openModal, setTransaction}: Props)=> {
    // const {amount, category, date} = transaction;
    
    return (
        <>
            <div className="card__transaction-amount">${transaction.amount}</div>  
                <div className="card__transaction-category">{transaction.category}</div>
                <div className="card__transaction-date">{transaction.date}</div>
                <div className="editIcon">
               <EditIcon onClick={()=> {
                   openModal();
                   setTransaction(transaction)
                   }}/>
            </div>
        </>
    )
}