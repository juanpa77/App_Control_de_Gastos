import { useState } from "react";

import { Idb } from "../utility/setIDB";
import { Balance } from "./cardBalanse"


export const AccountSumary = (props: { db: Idb; })=> {
  const {db} = props;

  const getFullAmount = async ()=> {
    await db.openDB();
    const total = await db.cursor();
    return total
  }
  const [availableMoney, setAvailableMoney] = useState(getFullAmount());
    
    return (
        <div className="accountSumary">
            <h2>Estado de Cuenta</h2>
            <Balance timeRanges='Mensual' icome={40000} available={availableMoney} expense={4000} />
            <Balance timeRanges='Semanal' icome={5000} available={availableMoney} expense={100} />
            <Balance timeRanges='Diario' icome={0} available={availableMoney} expense={0} />      
        </div>
    )
}