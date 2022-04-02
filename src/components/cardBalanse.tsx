import { CardData } from "./cardData"; 
import { useEffect, useState } from "react";


export const Balance = (props: { 
    timeRanges: string, icome: number, expense: number, available: Promise<number>; }) => {
    const {timeRanges, icome, expense, available} = props;
    const [amount, setAmount] = useState(0)

    useEffect(()=> {
        available.then(res=>setAmount(res))
    })

    return (
        <div className="cardBalance">
            <CardData name="containerAvailable" tipeData={"Disponible "+timeRanges} 
            value={amount} />
            <div className="line"></div>
            <div className="containerTipeOfData">
                <CardData name="containerIcome" tipeData="Ingreso" value={icome}/>
                <CardData name="containerExpense" tipeData="Gastos" value={expense}/>
            </div>
        </div>
    )
}

