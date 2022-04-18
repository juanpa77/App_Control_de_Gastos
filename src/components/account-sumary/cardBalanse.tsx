import { CardData } from "./cardData"; 
import { useEffect, useState } from "react";
import { Idb } from "../../utility/IDB";


export const Balance = (props: {db: Idb, dateRanges: string}) => {
    const {dateRanges, db} = props;
    const currentMonth = '0'+(new Date().getMonth()+1);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [available, setAvailable] = useState(0);
    
    const calcAvailable = ()=> {
        if (dateRanges === 'Mensual') setAvailable(incomeTotal - expenses);
        if (dateRanges === 'Semanal') setAvailable(Math.round((incomeTotal/4) - expenses));
        if (dateRanges === 'Diario') setAvailable(Math.round((incomeTotal/31) - expenses));
    }
    
    useEffect(()=> {
        db.getAmount(currentMonth, dateRanges, 'Income').then(res=>setIncomeTotal(res));
        db.getAmount(currentMonth, dateRanges, 'Expenses').then(res=>setExpenses(res));
        calcAvailable();
    }, [income, expenses, available])

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