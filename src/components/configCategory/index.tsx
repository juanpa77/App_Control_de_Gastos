import { nanoid } from "nanoid";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import { useCategoryContex } from "../../hooks/useContex";
import { useFocus } from "../../hooks/useFoucus";
import { useModal } from "../../hooks/useModal";
import { Category } from "../../services/dbCategory";
import { Idb } from "../../services/IDB";
import { SecondaryBtn } from "../button/secundary";
import { ToggleButton } from "../button/Toggle";
import { ConfigItem } from "../configItem"
import { Modal } from "../modal/modal";
import { Conteiner } from "./styled";

export const CategoryScreen = ({db}:{db:Idb})=> {
    const [isEditCategory, setIsEditCategory] = useState(false);
    const {category, setCategory} = useCategoryContex();
    const [isOpenModal, openModal, closeModal] = useModal();
    const [isOpenModalConfirmation, openModalConfirmation, closeModalConfirmation ] = useModal();
    
    const inputFocus = useRef<HTMLInputElement>(null);
    
    const [newCategory, setNewcategory] = useState<Category>({
        id: nanoid(8),
        name: '',
        isRecurring: false,
    });
    const findCategory = (name: string )=> category.find((category)=> category.name === name);
    
    useEffect(()=>{
        inputFocus.current?.focus()
    },[isOpenModal])
    
    const openModalCategoy = (name: string, isEdit: boolean)=> {
        setIsEditCategory(isEdit);
        const id = findCategory(name);
        setNewcategory({
            isRecurring: id?.isRecurring || false,
            name: name,
            id: id?.id || nanoid(8)
        });
        openModal();
        inputFocus.current?.focus()
    }
    
    const handelInputChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setNewcategory({
            ...newCategory,
            name :e.currentTarget.value,
        })
    }

    const handelToggleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setNewcategory({
            ...newCategory,
            isRecurring :e.currentTarget.checked,
        })
    }

    const updateContexCategory = ()=>{
        const index = category.findIndex((categories)=> categories.id === newCategory.id);
        category[index] = newCategory;
    }
    
    const setCategroy = ()=> {
        db.config.updatCategory(newCategory);
        isEditCategory
        ? updateContexCategory()
        : setCategory([...category, newCategory]);
        closeModal();
    }

    const deleteCategory = ()=>{ 
        db.config.deletCategory(newCategory);
        const updateCategory =category.filter((cat)=> cat.id !== newCategory.id );
        setCategory(updateCategory);
        closeModal();
        closeModalConfirmation()
    }

    return (
        <>
            <Conteiner >
                {category?.map((category, i)=> {
                    return (
                        <ConfigItem key={i} itemTitle={category.name} onClick={(e)=>{openModalCategoy(e.currentTarget.textContent!, true)}}>
                        </ConfigItem>
                    )
                })}
                <Modal isOpenModal={isOpenModal} closeModal={closeModal} >
                    <ToggleButton checked={newCategory.isRecurring} onChange={handelToggleChange} labelDescription={'Es un gasto figo'}  />
                    <input 
                     type='text' onChange={handelInputChange}
                     value={newCategory.name}
                     ref={inputFocus}
                    />
                    <SecondaryBtn onClick={setCategroy}
                     text={isEditCategory? 'Editar' : 'Agregar'}>
                     </SecondaryBtn>
                     {isEditCategory
                     ? <SecondaryBtn onClick={openModalConfirmation} text="Borrar" ></SecondaryBtn> 
                     : ''}
                     <Modal isOpenModal={isOpenModalConfirmation} closeModal={closeModalConfirmation} >
                         <strong> Seguro que desea eleminar esta categoria</strong>
                         <h4>{newCategory.name}</h4>
                        <SecondaryBtn onClick={deleteCategory} text={'confiramar'} />
                     </Modal>
                </Modal>    
            </Conteiner>   
            <SecondaryBtn onClick={()=>openModalCategoy('', false)}>Agregar categoria</SecondaryBtn>
        </>
    )
} 