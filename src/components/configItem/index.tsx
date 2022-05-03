import { ReactComponent as NexIcon } from "./assets/nexIcon.svg";
import { MouseEventHandler, ReactNode } from "react"
import { IconContainer, ItemCategoryBtn, ItemConfigLink } from "./styled"
import { Content } from "./content";
import { ToggleButton } from "../button/Toggle";

interface Props {
    children: ReactNode
    itemTitle: string
    itemDescription?: string
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
    to?: string
}

export const ConfigItem = ({children, itemTitle, itemDescription, to, onClick}: Props)=> {

    return  to ? (
        <ItemConfigLink to={to} >
            <Content itemTitle={itemTitle} itemDescription={itemDescription} >
                {children}
            </Content>
        </ItemConfigLink>
     )
    : (
        <ItemCategoryBtn onClick={onClick}>
            <IconContainer>
                {children}
            </IconContainer>
            <strong>{itemTitle}</strong>
            <ToggleButton onChange={(e)=> e.currentTarget.checked = false} />
            <NexIcon />
        </ItemCategoryBtn>
    ) 

}