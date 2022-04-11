import { useEffect, useState } from "react";
import { CardTransaction } from "./transaction-item";
import { TransactionListDb } from "./transactionList";


export const TransactionList = ({transactionList}: {transactionList: TransactionListDb})=> {
    const db = transactionList;
    const [listTransaction, setListTransaction] = useState([{
        type: '',
        amount: 0,
        date:  '',
        category:'' ,
        description: ''
    }])
    
    useEffect(()=> {
        db.get('Expenses').then(listExpenses=> setListTransaction(listExpenses))
        });

    return (
        <ol className="screen__trasactionList">
            {listTransaction.map((transaction, i)=> {
                return (
                    <li className="card__transaction" 
                        key={i}><CardTransaction
                            amount={transaction.amount}
                            date={transaction.date}
                            category={transaction.category} 
                            type={""} 
                            description={""}/>
                    </li>)
            })}
        </ol>
    )


}