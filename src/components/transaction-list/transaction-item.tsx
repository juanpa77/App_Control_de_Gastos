
import { useNavigate } from 'react-router-dom';
import { TransactionType } from '../add-new-transaction/add-Transaction'
import { ReactComponent as EditIcon } from './editIcon.svg'



export const CardTransaction = (props: TransactionType)=> {
    const {amount, category, date} = props;
    const navigate = useNavigate();

    const goToEdit = ()=> {
        navigate('../transaction', {state:props})
    }
    
    return (
        <>
            <div className="card__transaction-amount">${amount}</div>  
                <div className="card__transaction-category">{category}</div>
                <div className="card__transaction-date">{date}</div>
                <div className="editIcon">
                    <EditIcon onClick={goToEdit}/>
            </div>
        </>
    )
}