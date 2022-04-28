import { ReactNode } from "react"
import { IconContainer, Item } from "./styled"
import { ReactComponent as NexIcon } from "./assets/nexIcon.svg";


interface Props {
    children: ReactNode
}

export const ConfigItem = ({children}: Props)=> {

    return (
        <Item >
            <IconContainer>
                {children}
            </IconContainer>
            <strong>Categorias</strong>
            <p>Agregar Modificar y Eliminar</p>
            <NexIcon />
        </Item>
    )
}