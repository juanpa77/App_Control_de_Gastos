import { NavbarFilter } from "./filter-navbar";
import { Dispatch, SetStateAction } from "react";
import { TransactionData } from "../transaction-form/useTransaction";
import { CardTransaction } from "./transaction-item";
import { TransactionListDb } from "./transactionList";
import useTransactionList from "./hooks/useTransactionList";
import useToggle from "../toggle-btn/useToggle";

type Props = {
  db: TransactionListDb
  openModal: () => void
  setSelectedTransaction: Dispatch<SetStateAction<TransactionData | undefined>>
}

const TransactionList = ({ db, openModal, setSelectedTransaction }: Props) => {
  const [toggle, triggerFilterToggle] = useToggle()
  const [listTransaction] = useTransactionList({ db, toggle })
  return (
    <>
      <NavbarFilter
        triggerToggle={triggerFilterToggle}
        toggle={toggle}
      />
      <ol className="screen__trasactionList">
        {listTransaction.map(transaction => {
          return (
            <li className="card__transaction" key={transaction.id}>
              <CardTransaction
                setTransaction={setSelectedTransaction}
                transaction={transaction}
                openModal={openModal}
              />
            </li>
          );
        })}
      </ol>
    </>
  );
}

export default TransactionList