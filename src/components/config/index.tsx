import { ReactComponent as IconCategory } from "./assets/iconCategory.svg";
import { ConfigItem } from '../configItem';

export const Config = ()=> {
    
    return(
        <>
            <ConfigItem to="/config/category" itemTitle="Categorias" itemDescription="Agregar Editar Eliminar">
                <IconCategory/>
            </ConfigItem>
        </>
    )
}