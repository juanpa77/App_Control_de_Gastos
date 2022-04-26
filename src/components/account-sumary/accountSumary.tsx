import { ReactComponent as Config } from "./assets/config.svg";
import './account-sumary.css';
import { Idb } from "../../utility/IDB";
import { Balance } from "./cardBalanse";
import { Modal } from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCategoryContex } from "../../hooks/useContex";


export const AccountSumary = ({db}: {db: Idb})=> {
    const [isOpenModal, openModal, closeModal] = useModal();

    const {category, setCategory} = useCategoryContex();
    
    useEffect(()=> {db.config.getCategory().then(res=> setCategory(res))},[])
    
    return (
        <div className="accountSumary">
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
        </div>
    )
}