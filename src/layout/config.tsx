import { Outlet } from "react-router-dom"
import { ConfigScreen } from "../components/config/styled"

export const ScreenConfig = ()=> {

    return (
        <ConfigScreen>
            <Outlet/>
        </ConfigScreen>
    )
}