import { ReactComponent as Config } from "../../components/BalanceCard/assets/config.svg";
import { ReactComponent as User } from "../../asset/icons/user.svg"
import { Idb } from "../../utility/IDB";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCategoryContex } from "../../hooks/useContex";
import { Balance } from "../../components/BalanceCard";
import { Footer, Wrapper } from "./styled";
import UserModal from "./userModal";
import { useModal } from "../../hooks/useModal";

export const AccountSumary = ({ db }: { db: Idb }) => {
  const { setCategory } = useCategoryContex();
  const [isOpenModal, openModal, closeModal] = useModal(false)

  useEffect(() => {
    db.config.getCategory().then((res) => setCategory(res));
  }, []);

  return (
    <Wrapper>
      <Footer>
        <User onClick={openModal} />
        Estado de Cuenta
        <Link to={"/config"}>
          <Config />
        </Link>
      </Footer>
      <Balance db={db} dateRanges="Mensual" />
      <Balance db={db} dateRanges="Semanal" />
      <Balance db={db} dateRanges="Diario" />
      <UserModal isOpenModal={isOpenModal} closeModal={closeModal} />
    </Wrapper>
  );
};
