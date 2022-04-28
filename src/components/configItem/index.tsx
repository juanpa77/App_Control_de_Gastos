import { ReactNode } from "react"
import { IconContainer, Item } from "./styled"
import { ReactComponent as NexIcon } from "./assets/nexIcon.svg";


interface Props {
    children: ReactNode
    onClick: () => void
}

export const ConfigItem = ({children, onClick}: Props)=> {

    return (
        <Item onClick={onClick}>
            <IconContainer>
                {children}
            </IconContainer>
            <strong>Categorias</strong>
            <p>Agregar Modificar y Eliminar</p>
            <NexIcon />
        </Item>
    )
}