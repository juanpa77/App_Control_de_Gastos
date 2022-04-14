
import { ReactComponent as Wallet } from '../asset/icons/wallet.svg';
import { ReactComponent as Transaction } from '../asset/icons/transaction.svg';
import { ReactComponent as List } from '../asset/icons/list.svg'
import { NavLink, Outlet } from 'react-router-dom';


export const Layout = ()=>{
    const active = ({isActive}: {isActive: boolean})=> isActive? 'active' : 'inactive'
    return (
        <div className="layout">
            <Outlet />
            <div className="mainBar">
                <NavLink 
                    to='/'
                    className={active}>
                    <Wallet />
                </NavLink>
                <NavLink 
                    className={active}
                    to='/transaction'>
                    <Transaction />
                </NavLink>
                <NavLink 
                    className={active}
                    to='/transaction-list'>
                    <List />
                </NavLink>
            </div>
        </div>
    )   
}