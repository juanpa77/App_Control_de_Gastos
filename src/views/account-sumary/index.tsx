import { ReactComponent as Config } from "../../components/account-sumary/assets/config.svg";
import { Idb } from "../../utility/IDB";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCategoryContex } from "../../hooks/useContex";
import { Balance } from "../../components/BalanceCard";
import { Footer, Wrapper } from "./styled";

export const AccountSumary = ({ db }: { db: Idb }) => {
  const { setCategory } = useCategoryContex();

  useEffect(() => {
    db.config.getCategory().then((res) => setCategory(res));
  }, []);

  return (
    <Wrapper>
      <Footer>
        Estado de Cuenta
        <Link to={"/config"}>
          <Config />
        </Link>
      </Footer>
      <Balance db={db} dateRanges="Mensual" />
      <Balance db={db} dateRanges="Semanal" />
      <Balance db={db} dateRanges="Diario" />
    </Wrapper>
  );
};
