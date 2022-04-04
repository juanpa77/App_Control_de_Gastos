import { CardData } from "./cardData"; 
import { useEffect, useState } from "react";
import { Idb } from "../utility/IDB";


export const Balance = (props: {db: Idb, dateRanges: string}) => {
    const {dateRanges, db} = props;
    
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [available, setAvailable] = useState(0);

    useEffect(()=> {
        db.getAmount('Income', dateRanges).then(res=>setIncome(res));
        db.getAmount('Expenses', dateRanges).then(res=>setExpenses(res));
        setAvailable(income - expenses);
    }, [income, expenses])

    return (
        <div className="cardBalance">
            <CardData name="containerAvailable" tipeData={"Disponible "+dateRanges} 
            value={available} />
            <div className="line"></div>
            <div className="containerTipeOfData">
                <CardData name="containerIcome" tipeData="Ingreso" value={income}/>
                <CardData name="containerExpense" tipeData="Gastos" value={expenses}/>
            </div>
        </div>
    )
}

