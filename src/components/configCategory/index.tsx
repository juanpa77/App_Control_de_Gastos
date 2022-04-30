import { useState, ChangeEvent } from "react";
import { useCategoryContex } from "../../hooks/useContex";
import { useModal } from "../../hooks/useModal";
import { Idb } from "../../services/IDB";
import { SecondaryBtn } from "../button/secundary";
import { ConfigItem } from "../configItem"
import { Modal } from "../modal/modal";
import { Conteiner } from "./styled";

export const CategoryScreen = ({db}:{db:Idb})=> {
    const [newCategory, setNewcategory] = useState('');
    const {category, setCategory} = useCategoryContex();
    const [isOpenModal, openModal, closeModal] = useModal();
    
    const handelInputChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setNewcategory(e.currentTarget.value)
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
                        <ConfigItem key={i} itemTitle={category} >
                        </ConfigItem>
                    )
                })}
                <Modal isOpenModal={isOpenModal} closeModal={closeModal} >
                    <input type='text' onChange={handelInputChange}></input>
                    <SecondaryBtn onClick={addCategroy}>Agregar</SecondaryBtn>
                </Modal>    
            </Conteiner>   
            <SecondaryBtn onClick={openModal}>Agregar categoria</SecondaryBtn>
        </>
    )
} 
                