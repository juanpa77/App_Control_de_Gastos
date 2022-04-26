import { ChangeEvent } from "react"
import { useCategoryContex } from "../../hooks/useContex"

interface Props {
    handleInputChange(e:ChangeEvent<HTMLSelectElement>): void
    defaultCategory: string
}

export const Select = ({handleInputChange, defaultCategory}: Props)=> {
    const {category, setCategory} = useCategoryContex()
    
    return (
        <select
            defaultValue={defaultCategory}
            onChange={(e)=>handleInputChange(e)}
            name="category" >
            {category.map((cate, i)=>{
               return(
                   <option key={i}>{cate}</option>
               ) 
            })}
        </select>
    )
}