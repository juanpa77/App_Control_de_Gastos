import { ReactComponent as Edit } from "../../asset/icons/editIcon.svg";
import { ReactComponent as IconCategory } from "./assets/iconCategory.svg";
import { ChangeEvent, useState } from "react";
import { useCategoryContex } from "../../hooks/useContex";
import { useModal } from "../../hooks/useModal";
import { Idb } from "../../services/IDB";
import { Modal } from "../modal/modal";
import { CategoryList, CategoryListItem, ConfigScreen, Title } from './styled';
import { SecondaryBtn } from '../button/secundary';
import { ConfigItem } from '../configItem';
import { Link, Outlet } from "react-router-dom";

export const Config = ({db}: {db:Idb})=> {
    const [isOpenModalEdit, openModalEdit, closeModalEdit] = useModal();
    const [isOpenModal, openModal, closeModal] = useModal();
    const [newCategory, setNewcategory] = useState('');
    const {category, setCategory} = useCategoryContex();

    const handelInputChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setNewcategory(e.currentTarget.value)
    }

    const addCategroy =()=> {
        db.config.addCategory(newCategory);
        setCategory([...category, newCategory]);
        closeModal();
    }
    
    return(
        <>
            <Title>Configuraciones</Title>
            <ConfigItem itemTitle="Categorias" itemDescription="Agregar Editar Eliminar">
                <IconCategory/>
            </ConfigItem>
            
            {/* ----------------REFACTORING IN PROGRES -------------- */}
            <Modal isOpenModal={isOpenModalEdit} closeModal={closeModalEdit} >
                <CategoryList >
                    {category?.map((category, i)=> {
                        return(
                            <CategoryListItem key={i}>
                                {category}
                                <Edit onClick={openModalEdit}/>
                            </CategoryListItem>
                        )
                    })}
                </CategoryList>
                <SecondaryBtn onClick={openModal}>Agregar categoria</SecondaryBtn>
            </Modal>
            <Modal isOpenModal={isOpenModal} closeModal={closeModal} >
                <input type='text' onChange={handelInputChange}></input>
                <SecondaryBtn onClick={addCategroy}>Agregar</SecondaryBtn>
            </Modal>
        {/* --------------------- */}
        </>
    )
}