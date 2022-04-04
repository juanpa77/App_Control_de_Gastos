
import { Idb } from "../utility/IDB";
import { Balance } from "./cardBalanse"


export const AccountSumary = (props: { db: Idb; })=> {
  const {db} = props;

    return (
        <div className="accountSumary">
            <h2>Estado de Cuenta</h2>
            <Balance db={db} dateRanges='Mensual' />
            <Balance db={db} dateRanges='Semanal' />
            <Balance db={db} dateRanges='Diario' />      
        </div>
    )
}