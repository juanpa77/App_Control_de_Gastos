import './index.css';
import { ReactComponent as Edit } from "../../asset/icons/editIcon.svg";
import { ReactComponent as IconCategory } from "./assets/iconCategory.svg";
import { ChangeEvent, useState } from "react";
import { useCategoryContex } from "../../hooks/useContex";
import { useModal } from "../../hooks/useModal";
import { Idb } from "../../services/IDB";
import { Modal } from "../modal/modal";
import { CategoryList, CategoryListItem, ConfigScreen } from './styled';
import { SecondaryBtn } from '../button/secundary';
import { ConfigItem } from '../configItem';

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
            <h3>Configuraciones</h3>
            <ConfigScreen >
                <ConfigItem >
                    <IconCategory/>
                </ConfigItem>
                {/* <CategoryList >
                    {category?.map((category, i)=> {
                        return(
                            <CategoryListItem >
                                {category}
                                <Edit onClick={openModalEdit}/>
                            </CategoryListItem>
                        )
                    })}
                </CategoryList> */}
                {/* <SecondaryBtn onClick={openModal}>Agregar categoria</SecondaryBtn> */}
                <Modal isOpenModal={isOpenModal} closeModal={closeModal} >
                    <input type='text' onChange={handelInputChange}></input>
                    <SecondaryBtn onClick={addCategroy}>Agregar</SecondaryBtn>
                </Modal>
                <Modal isOpenModal={isOpenModalEdit} closeModal={closeModalEdit} >
                    
                </Modal>
            </ConfigScreen>
        </>
    )
}