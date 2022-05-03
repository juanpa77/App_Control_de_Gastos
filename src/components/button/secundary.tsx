import { ReactNode } from "react"
import { Button } from "./styled"

interface Props {
    children?: ReactNode
    onClick: () => void
    text?: string
}

export const SecondaryBtn = ({children, onClick, text}: Props)=> {

    return (
        <Button onClick={onClick}>        
            {children}
            {text}
        </Button>
    )
}