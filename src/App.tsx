import './style/App.css';
import './style/expenseLayut.css';
import './components/transaction-list/transaction-list-itm.css';
import { Idb } from './utility/IDB';

import { Transaction } from './components/add-new-transaction/add-Transaction';
import { AccountSumary } from './components/account-sumary/accountSumary';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout';
import { TransactionList } from './components/transaction-list/screen-transaction-list';
import { TransactionListDb } from './components/transaction-list/transactionList';
import { SuccessfulTransaction } from './components/modal/Successful-transaction';

function App() {
  const db = new Idb();
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<AccountSumary db={db} />} />
          <Route path='/transaction' element={<Transaction db={db} />} />
          <Route path='/successful-transaction' element={<SuccessfulTransaction />} />
          <Route path='/transaction-list' element={<TransactionList transactionList={new TransactionListDb(db)} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
