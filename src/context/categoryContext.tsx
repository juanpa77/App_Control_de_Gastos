import { createContext, useState } from "react";
import { Category } from "../services/dbCategory";
interface props {
    children: JSX.Element | JSX.Element[]
}


export type CategoryContex = {
    category: Category[]
    setCategory: (category: Category[]) => void
}

const Context = createContext<CategoryContex>({} as CategoryContex);

export const CategoryProvider = ({ children }: props)=>{
    const [category, setCategory] = useState([{name:'', isRecurring: false}]);

    return (
        <Context.Provider value={{category, setCategory}} >
            {children}    
        </Context.Provider>
    )
}

export default Context