
import { splitDate } from '../../utility/formatDate'
import { TransactionData } from '../add-new-transaction/add-Transaction'
import { ReactComponent as EditIcon } from './icons/editIcon.svg'
interface Props {
    transaction: TransactionData
    openModal: ()=> void
    setTransaction: React.Dispatch<React.SetStateAction<TransactionData | undefined>>
}

export const CardTransaction = ({transaction, openModal, setTransaction}: Props)=> {
    // const {amount, category, date} = transaction;
    const [dia, mes, ano] = splitDate(transaction.date)
    return (
        <>
            <div className="card__transaction-amount">${transaction.amount}</div>  
                <div className="card__transaction-category">{transaction.category}</div>
                <div className="card__transaction-date">{`${dia}/${mes}`}</div>
                <div className="editIcon">
               <EditIcon onClick={()=> {
                   openModal();
                   setTransaction(transaction)
                   }}/>
            </div>
        </>
    )
}