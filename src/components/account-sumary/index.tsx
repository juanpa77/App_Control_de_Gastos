
import { ReactComponent as Config } from "./assets/config.svg";
import './account-sumary.css';
import { Idb } from "../../services/IDB";
import { Balance } from "../cardBalanse";
import { Modal } from "../modal/modal";
import { useModal } from "../../hooks/useModal";
<<<<<<< HEAD:src/components/account-sumary/index.tsx
// import { CategoryModal } from "../modal/categoryModal";
import { Link } from "react-router-dom";
import { AccountSumaryStyled } from "./styled";



export const AccountSumary = ({db}: {db: Idb})=> {
    // const [isOpenModal, openModal, closeModal] = useModal();

=======
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCategoryContex } from "../../hooks/useContex";


export const AccountSumary = ({db}: {db: Idb})=> {
    const [isOpenModal, openModal, closeModal] = useModal();

    const {category, setCategory} = useCategoryContex();
    
    useEffect(()=> {db.config.getCategory().then(res=> setCategory(res))},[])
    
>>>>>>> master:src/components/account-sumary/accountSumary.tsx
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
<<<<<<< HEAD:src/components/account-sumary/index.tsx
   {/*          <CategoryModal isOpenModal={isOpenModal} closeModal={closeModal} >
                
            </CategoryModal> */}
        </AccountSumaryStyled>
=======
        </div>
>>>>>>> master:src/components/account-sumary/accountSumary.tsx
    )
}