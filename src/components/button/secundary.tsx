import { ReactNode } from "react"
import { Button } from "./styled"

interface Props {
    children: ReactNode
    onClick: () => void
}

export const SecondaryBtn = ({children, onClick}: Props)=> {

    return (
        <Button onClick={onClick}>        
            {children}
        </Button>
    )
}