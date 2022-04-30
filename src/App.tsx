import './style/App.css';
import './style/expenseLayut.css';
import './components/transaction-list/transaction-list-itm.css';
import { Idb } from './services/IDB';

import { Transaction } from './components/add-new-transaction/add-Transaction';
import { AccountSumary } from './components/account-sumary';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout';
import { TransactionList } from './components/transaction-list/screen-transaction-list';
import { TransactionListDb } from './components/transaction-list/transactionList';
import { SuccessfulTransaction } from './components/modal/Successful-transaction';
import { CategoryProvider } from './context/categoryContext';
import { Config } from './components/config';
import { CategoryScreen } from './components/configCategory';
import { ScreenConfig } from './layout/config';

function App() {
  const db = new Idb();
  
  return (
    <div className="App">
      <CategoryProvider >
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<AccountSumary db={db} />} />
            <Route path='/config' element={<ScreenConfig />} >
              <Route index element={<Config />} />
              <Route path='/config/category' element={<CategoryScreen db={db} />} />
            </Route>
            <Route path='/transaction' element={<Transaction db={db} />} />
            <Route path='/successful-transaction' element={<SuccessfulTransaction />} />
            <Route path='/transaction-list' element={<TransactionList transactionList={new TransactionListDb(db)} />} />
          </Route>
        </Routes>
      </CategoryProvider>
    </div>
  );
}

export default App;
