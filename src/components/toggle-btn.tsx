interface Props {
    classTriggerToggle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    toggle: boolean
}

export const ToggleBtn = ({classTriggerToggle, toggle}:Props)=> {
    return (
        <div className="select__radio">
            <div 
                className={`icome__radioButton ${toggle ? 'active__radioButton': ''}`}
                onClick={(e)=>classTriggerToggle(e)}>
                    Ingreso
            </div>
            <div 
                onClick={(e)=>classTriggerToggle(e)}
                className= {`expense__radioButton ${toggle ? '': 'active__radioButton'}`}>
                Gasto
            </div>
        </div>
    )
}