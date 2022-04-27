import './index.css';
import { ChangeEvent, useState } from "react";
import { useCategoryContex } from "../../hooks/useContex";
import { useModal } from "../../hooks/useModal";
import { Idb } from "../../services/IDB";
import { Modal } from "../modal/modal";

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
        <div className="config">
            <ol className='list-category'>
            {category?.map((category, i)=> {
                return(
                    <li key={i }>
                        <div className="list-category-item">
                            {category}
                            {/* <Edit onClick={openModalEdit}/> */}
                        </div>
                    </li>                        
                )
            })}
            </ol>
            <button className='config__btn-addCategory' onClick={openModal}>Agregar categoria</button>
            <Modal isOpenModal={isOpenModal} closeModal={closeModal} >
                <input type='text' onChange={handelInputChange}></input>
                <button onClick={addCategroy}> Agregar </button>
            </Modal>
            <Modal isOpenModal={isOpenModalEdit} closeModal={closeModalEdit} >
                
            </Modal>
        </div>
    )
}