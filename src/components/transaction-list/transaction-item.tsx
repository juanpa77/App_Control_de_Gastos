
import { splitDate } from '../../utility/formatDate'
import { TransactionType } from '../add-new-transaction/add-Transaction'
import { ReactComponent as EditIcon } from './icons/editIcon.svg'
interface Props {
    transaction: TransactionType
    openModal: ()=> void
    setTransaction: React.Dispatch<React.SetStateAction<TransactionType | undefined>>
}

export const CardTransaction = ({transaction, openModal, setTransaction}: Props)=> {
    // const {amount, category, date} = transaction;
    const [dia, mes, ano] = splitDate(transaction.date)
    //console.log(for)
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