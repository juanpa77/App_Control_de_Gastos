import { ChangeEvent } from "react"
import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from "./styled"

interface Props {
    onChange ?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const ToggleButton = ({onChange}: Props)=> {
    
    const handelChange = (e:ChangeEvent<HTMLInputElement>)=>{
        onChange!(e)
    }

    return (
        <CheckBoxWrapper>
            <p>Es gasto figo</p>
            <CheckBox onChange={(e)=>handelChange(e)} id="checkbox" type="checkbox" />
            <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
    )
}