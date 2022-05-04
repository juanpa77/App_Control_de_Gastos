import { CardData } from "./cardData"; 
import { useEffect, useState } from "react";
import { Idb } from "../../services/IDB";
import { formatNumber } from "../../services/formatDate";
import { useCategoryContex } from "../../hooks/useContex";


export const Balance = (props: {db: Idb, dateRanges: string}) => {
    const {dateRanges, db} = props;
    const currentMonth = '0'+(new Date().getMonth()+1);

    const [totalIncome, setTotalIncome] = useState(0);
    const [monthExpenses, setMonthExpenses] = useState(0);
    
    const [available, setAvailable] = useState(0);

    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const {category, setCategory} = useCategoryContex();
    
    const calcAvailable = ()=> {
        if (dateRanges === 'Mensual') setAvailable((totalIncome - monthExpenses) - expenses);
        if (dateRanges === 'Semanal') setAvailable(Math.round(((totalIncome - monthExpenses )/4) - expenses));
        if (dateRanges === 'Diario') setAvailable(Math.round(((totalIncome - monthExpenses)/31) - expenses));
    }
    
    useEffect(()=> {
        db.getAmount(currentMonth, dateRanges, 'Income', category)
            .then(res=> {
                const [accumulator, accumulatorFixed] = res
                setIncome(accumulator)
            });
        db.getAmount(currentMonth, 'Mensual', 'Income', category)
            .then(res=> {
                const [accumulator, accumulatorFixed] = res;
                setTotalIncome(accumulator);
            });
        db.getAmount(currentMonth, dateRanges, 'Expenses', category)
            .then(res=> {
                const [accumulator, accumulatorFixed] = res;
                setMonthExpenses(accumulatorFixed);
                setExpenses(accumulator)
            });
        calcAvailable();
    }, [income, expenses, totalIncome])

    return (
        <div className="cardBalance">
            <CardData name="containerAvailable" tipeData={"Disponible "+dateRanges} 
            value={formatNumber(available)} />
            <div className="line"></div>
            <div className="containerTipeOfData">
                <CardData name="containerIcome" tipeData="Ingreso" value={formatNumber(income)}/>
                <CardData name="containerExpense" tipeData="Gastos" value={formatNumber(expenses)}/>
            </div>
        </div>
    )
}