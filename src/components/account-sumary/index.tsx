
import { ReactComponent as Config } from "./assets/config.svg";
import './account-sumary.css';
import { Idb } from "../../services/IDB";
import { Balance } from "../cardBalanse";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCategoryContex } from "../../hooks/useContex";
import { AccountSumaryStyled } from "./styled";


export const AccountSumary = ({db}: {db: Idb})=> {

    const {category, setCategory} = useCategoryContex();
    
    useEffect(()=> {db.config.getCategory().then(res=> setCategory(res))},[])
    
    return (
        <AccountSumaryStyled>
            <div className="accountSumary__footer">
                <div className="accountSumary__title">
                    Estado de Cuenta
                </div>
                <Link to={"/config"} >
                    <Config />
                </Link>
            </div>
            <Balance db={db} dateRanges='Mensual' />
            <Balance db={db} dateRanges='Semanal' />
            <Balance db={db} dateRanges='Diario' />
        </AccountSumaryStyled>
    )
}