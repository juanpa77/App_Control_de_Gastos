import { ChangeEvent } from "react"
import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from "./styled"

interface Props {
    onChange ?: (e: ChangeEvent<HTMLInputElement>) => void
    labelDescription?: string
    checked?: boolean
}

export const ToggleButton = ({onChange, labelDescription, checked}: Props, )=> {
    
    const handelChange = (e:ChangeEvent<HTMLInputElement>)=>{
        onChange!(e)
    }

    return (
        <CheckBoxWrapper>
            <p>{labelDescription}</p>
            <CheckBox checked={checked} onChange={(e)=>handelChange(e)} id="checkbox" type="checkbox" />
            <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
    )
}