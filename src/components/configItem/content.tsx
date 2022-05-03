import { ReactNode } from "react"
import { IconContainer } from "./styled"
import { ReactComponent as NexIcon } from "./assets/nexIcon.svg";

interface Props {
    children: ReactNode
    itemTitle: string
    itemDescription?: string
}

export const Content = ({children, itemTitle, itemDescription}: Props)=> {

    return (
        <>
            <IconContainer>
                {children}
            </IconContainer>
            <strong>{itemTitle}</strong>
            <p>{itemDescription}</p>
            <NexIcon />
        </>
    )
}