import { useEffect, useState } from "react";
import { transaction } from "../add-new-transaction/add-Transaction";
import { NavbarFilter } from "./filter-navbar";
import { CardTransaction } from "./transaction-item";
import { TransactionListDb } from "./transactionList";


export const TransactionList = ({transactionList}: {transactionList: TransactionListDb})=> {
    const db = transactionList;
    const [filter, setFilter] = useState({type:'Expenses', toggle: false});
    const [listTransaction, setListTransaction] = useState<transaction[]>([])
    
    useEffect(()=> {
        db.get(filter.type).then(listExpenses=> setListTransaction(listExpenses))
        });

    const classTriggerToggle = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        const classList = e.currentTarget.classList.length;        
        if (classList < 2) {
            setFilter({type: e.currentTarget.textContent === 'Gasto' ? 'Expenses': 'Income', toggle: !filter.toggle})
            }
       }
    return (
        <>
            <NavbarFilter classTriggerToggle={classTriggerToggle} toggle={filter.toggle} />
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
        </>
    )


}