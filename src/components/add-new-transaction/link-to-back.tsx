import { Link } from "react-router-dom"

export const LinkBack = ({linkTo}:{linkTo:string})=>{
    return (
        <Link to={linkTo} >
            Click me
        </Link>
    )
}