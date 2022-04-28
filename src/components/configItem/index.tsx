import { ReactNode } from "react"
import { IconContainer, Item } from "./styled"
import { ReactComponent as NexIcon } from "./assets/nexIcon.svg";


interface Props {
    children: ReactNode
    itemTitle: string
    itemDescription?: string
    onClick: () => void
}

export const ConfigItem = ({children, onClick, itemTitle, itemDescription}: Props)=> {

    return (
        <Item onClick={onClick}>
            <IconContainer>
                {children}
            </IconContainer>
            <strong>{itemTitle}</strong>
            <p>{itemDescription}</p>
            <NexIcon />
        </Item>
    )
}