import { ReactComponent as Config } from "../../components/account-sumary/assets/config.svg";
import { Idb } from "../../utility/IDB";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCategoryContex } from "../../hooks/useContex";
import { Balance } from "../../components/account-sumary/cardBalanse";

export const AccountSumary = ({ db }: { db: Idb }) => {
  const { setCategory } = useCategoryContex();

  useEffect(() => {
    db.config.getCategory().then((res) => setCategory(res));
  }, []);

  return (
    <div className="accountSumary">
      <div className="accountSumary__footer">
        <div className="accountSumary__title">Estado de Cuenta</div>
        <Link to={"/config"}>
          <Config />
        </Link>
      </div>
      <Balance db={db} dateRanges="Mensual" />
      <Balance db={db} dateRanges="Semanal" />
      <Balance db={db} dateRanges="Diario" />
    </div>
  );
};
