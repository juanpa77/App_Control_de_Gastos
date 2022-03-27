import React from 'react';
import './style/App.css';
import './style/expenseLayut.css'
import { Balance } from './components/cardBalanse';
import { ReactComponent as Wallet } from './asset/icons/wallet.svg'
import { Transaction } from './components/transaction';

function App() {
  return (
    <div className="App">
      {/* <h2>Estado de Cuenta</h2> */}
      <Transaction />
      {/* <Balance timeRanges='Mensual' icome={40000} available={40000} expense={4000} />
      <Balance timeRanges='Semanal' icome={5000} available={9000} expense={100} />
      <Balance timeRanges='Diario' icome={0} available={0} expense={0} />
      <div className="mainBar">
        <Wallet />
      </div> */}
    </div>
  );
}

export default App;
