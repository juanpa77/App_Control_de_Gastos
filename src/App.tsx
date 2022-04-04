import './style/App.css';
import './style/expenseLayut.css'

import { Idb } from './utility/IDB';
import { Transaction } from './components/transaction';
import { AccountSumary } from './components/accountSumary';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout';

function App() {
  const db = new Idb();
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<AccountSumary db={db} />} />
          <Route path='/transaction' element={<Transaction db={db} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
