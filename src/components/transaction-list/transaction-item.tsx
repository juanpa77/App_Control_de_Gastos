
interface Transaction {
    amount: number,
    category: string,
    date: string
}


export const CardTransaction = ({amount, category, date,}:Transaction)=> {
    
    return (
        <div className="card__transaction">
            <div className="card__transaction-amount">${amount}</div>  
            <div className="card__transaction-container-info">
                <div className="card__transaction-category">{category}</div>
                <div className="card__transaction-date">{date}</div>
            </div>
        </div>
    )
}