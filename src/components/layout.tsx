
import { ReactComponent as Wallet } from '../asset/icons/wallet.svg';
import { ReactComponent as Transaction } from '../asset/icons/transaction.svg';
import { ReactComponent as List } from '../asset/icons/list.svg'
import { Link, Outlet } from 'react-router-dom';


export const Layout = ()=>{
    return (
        <div className="layout">
            <Outlet />
            <div className="mainBar">
                <Link to='/'>
                    <Wallet />
                </Link>
                <Link to='/transaction'>
                    <Transaction />
                </Link>
                <Link to='/transaction-list'>
                    <List />
                </Link>
            </div>
        </div>
    )
}