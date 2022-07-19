import { ReactComponent as Wallet } from "../asset/icons/wallet.svg";
import { ReactComponent as Transaction } from "../asset/icons/transaction.svg";
import { ReactComponent as List } from "../asset/icons/list.svg";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { TouchEvent, useState } from "react";

export const Layout = () => {
  const active = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active" : "inactive";
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const minSwipeDistance = 50;

  const goTo = (path: string) => {
    console.log(location.pathname);
    if (location.pathname === "/") navigate(path);
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) {
      if (location.pathname === "/")
        isLeftSwipe ? goTo("/transaction") : goTo("/");
      if (location.pathname === "/transaction")
        isLeftSwipe ? goTo("/transaction-list") : goTo("/");
      if (location.pathname === "/transaction-list")
        isLeftSwipe ? goTo("/transaction-list") : goTo("/transaction");
    }
  };

  return (
    <div
      className="layout"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Outlet />
      <div className="mainBar">
        <NavLink to="/" className={active}>
          <Wallet />
        </NavLink>
        <NavLink className={active} to="/transaction">
          <Transaction />
        </NavLink>
        <NavLink className={active} to="/transaction-list">
          <List />
        </NavLink>
      </div>
    </div>
  );
};
