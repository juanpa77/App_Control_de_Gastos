import { ToggleBtn } from "../toggle-btn"

interface Props {
    classTriggerToggle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    toggle: boolean
}

export const NavbarFilter = ({classTriggerToggle, toggle}: Props)=> {
    return (
        <div className="navbar-filter">
            <ToggleBtn classTriggerToggle={classTriggerToggle} toggle={toggle} />
        </div>
    )
}