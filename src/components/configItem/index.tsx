import { ReactNode } from "react"
import { IconContainer, ItemConfigLink } from "./styled"
import { ReactComponent as NexIcon } from "./assets/nexIcon.svg";


interface Props {
    children: ReactNode
    itemTitle: string
    itemDescription?: string
}

export const ConfigItem = ({children, itemTitle, itemDescription}: Props)=> {

    return (
        <ItemConfigLink to={"/config/category"} >
            <IconContainer>
                {children}
            </IconContainer>
            <strong>{itemTitle}</strong>
            <p>{itemDescription}</p>
            <NexIcon />
        </ItemConfigLink>
    )
}