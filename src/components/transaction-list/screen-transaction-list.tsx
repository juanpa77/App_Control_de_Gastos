import { useEffect, useState } from "react";
import { transaction } from "../add-new-transaction/add-Transaction";
import { CardTransaction } from "./transaction-item";
import { TransactionListDb } from "./transactionList";


export const TransactionList = ({transactionList}: {transactionList: TransactionListDb})=> {
    const db = transactionList;
    const [listTransaction, setListTransaction] = useState<transaction[]>([])
    
    useEffect(()=> {
        db.get('Expenses').then(listExpenses=> setListTransaction(listExpenses))
        });

    return (
        <ol className="screen__trasactionList">
            {listTransaction.map((transaction, i)=> {
                return (
                    <li className="card__transaction" 
                        key={i}><CardTransaction
                            id={transaction.id}
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