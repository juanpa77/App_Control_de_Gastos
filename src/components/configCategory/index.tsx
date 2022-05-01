import { useState, ChangeEvent } from "react";
import { useCategoryContex } from "../../hooks/useContex";
import { useModal } from "../../hooks/useModal";
import { Category } from "../../services/dbCategory";
import { Idb } from "../../services/IDB";
import { SecondaryBtn } from "../button/secundary";
import { ToggleButton } from "../button/Toggle";
import { ConfigItem } from "../configItem"
import { Modal } from "../modal/modal";
import { Conteiner } from "./styled";

export const CategoryScreen = ({db}:{db:Idb})=> {
    const [newCategory, setNewcategory] = useState<Category>({
        name: '',
        isRecurring: false
    });
    
    const {category, setCategory} = useCategoryContex();
    const [isOpenModal, openModal, closeModal] = useModal();
    
    const handelInputChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setNewcategory({
            ...newCategory,
            [e.currentTarget.name] :e.currentTarget.value,
        })
    }

    const handelToggleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setNewcategory({
            ...newCategory,
            isRecurring :e.currentTarget.checked,
        })
    }

    const addCategroy =()=> {
        db.config.addCategory(newCategory);
        setCategory([...category, newCategory]);
        closeModal();
    }

    return (
        <>
            <Conteiner >
                {category?.map((category, i)=> {
                    return (
                        <ConfigItem key={i} itemTitle={category.name} >
                        </ConfigItem>
                    )
                })}
                <Modal isOpenModal={isOpenModal} closeModal={closeModal} >
                    <ToggleButton onChange={handelToggleChange} />
                    <input type='text' name="name" onChange={handelInputChange}></input>
                    <SecondaryBtn onClick={addCategroy}>Agregar</SecondaryBtn>
                </Modal>    
            </Conteiner>   
            <SecondaryBtn onClick={openModal}>Agregar categoria</SecondaryBtn>
        </>
    )
} 
                