import { MouseEvent, useState } from "react"


export const SelectTransactionType = ()=> {
    const [toggle, setToggle] = useState(false);
    
    const triggerToggle = (e: MouseEvent<HTMLDivElement>)=> {
        const classList = e.currentTarget.classList.length;        
        if (classList < 2) {
            setToggle(!toggle)
        }
    }

    return (
        <div className="select__radio">
            <div className={`icome__radioButton ${toggle ? 'active__radioButton': ''}`}
            onClick={(e)=>triggerToggle(e)}
            >Ingreso</div>
            <div onClick={(e)=>triggerToggle(e)}
            className= {`expense__radioButton ${toggle ? '': 'active__radioButton'}`}>
                Gasto
            </div>
        </div>
    )
}/*  */