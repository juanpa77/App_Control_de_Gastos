import { Outlet } from "react-router-dom"
import { ConfigScreen, Title } from "../components/config/styled"

export const ScreenConfig = ()=> {

    return (
        <ConfigScreen>
            <Title>Configuraciones</Title>
            <Outlet/>
        </ConfigScreen>
    )
}