import { ReactComponent as Edit } from "../../asset/icons/editIcon.svg";
import { ReactComponent as IconCategory } from "./assets/iconCategory.svg";
import { ConfigItem } from '../configItem';

export const Config = ()=> {
    
    return(
        <>
            <ConfigItem itemTitle="Categorias" itemDescription="Agregar Editar Eliminar">
                <IconCategory/>
            </ConfigItem>
        </>
    )
}