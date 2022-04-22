import { ReactComponent as Config } from "./assets/config.svg";
import './account-sumary.css';
import { Idb } from "../../utility/IDB";
import { Balance } from "./cardBalanse";


export const AccountSumary = ({db}: {db: Idb})=> {
    return (
        <div className="accountSumary">
            <div className="accountSumary__footer">
                <div className="accountSumary__title">
                    <h2>Estado de Cuenta</h2>
                </div>
                <Config />
            </div>
            <Balance db={db} dateRanges='Mensual' />
            <Balance db={db} dateRanges='Semanal' />
            <Balance db={db} dateRanges='Diario' />      
        </div>
    )
}