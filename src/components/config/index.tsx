import './index.css';
import { ChangeEvent, useEffect, useState } from "react";
import { useCategoryContex } from "../../hooks/useContex";
import { useModal } from "../../hooks/useModal";
import { Idb } from "../../utility/IDB";
import { Modal } from "../modal/modal";

export const Config = ({db}: {db:Idb})=> {
    // db.category.get().then(res=>console.log(res));
    
    const [isOpenModal, openModal, closeModal] = useModal();
    const {category, setCategory} = useCategoryContex();
    const [newCategory, setNewcategory] = useState('');

    const handelInputChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setNewcategory(e.currentTarget.value)
    }

    const addCategroy =()=> {
        db.category.add(newCategory);
        setCategory([...category, newCategory]);
    }
    
    return(
        <div className="config">
            <ol>
            {category?.map((category, i)=> {
                return(
                    <li key={i}>
                        {category}
                    </li>
                )
            })}
            </ol>
            <button className='config__btn-addCategory' onClick={openModal}>Agregar categoria</button>
            <Modal isOpenModal={isOpenModal} closeModal={closeModal} >
                <input type='text' onChange={handelInputChange}></input>
                <button onClick={addCategroy}> Agregar </button>
            </Modal>
        </div>
    )
}