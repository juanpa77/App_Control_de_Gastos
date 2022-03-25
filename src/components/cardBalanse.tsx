import { CardData } from "./cardData"; 

export const Balance = (props: { 
    timeRanges: string, icome: number, expense: number, available: number; }) => {
    const {timeRanges, icome, expense, available} = props;
    
    return (
        <div className="cardBalance">
            <CardData name="containerAvailable" tipeData={"Disponible "+timeRanges} value={available}/>
            <div className="line"></div>
            <div className="containerTipeOfData">
                <CardData name="containerIcome" tipeData="Ingreso" value={icome}/>
                <CardData name="containerExpense" tipeData="Gastos" value={expense}/>
            </div>
        </div>
    )
}



