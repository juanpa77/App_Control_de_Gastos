import { ReactComponent as EditIcon } from '../../asset/icons/editIcon.svg'
import { Dispatch, SetStateAction } from "react";
import { TransactionData } from "../transaction-form/useTransaction";
import { TransactionListDb } from "./services/getTransactionList";
import useTransactionList from "./hooks/useTransactionList";
import useToggle from "../toggle-btn/useToggle";
import { Filter, Item, List, TransactionItem } from "./styled";
import { formatNumber, splitDate } from "../../utility/formatDate";
import { ToggleBtn } from '../toggle-btn';

type Props = {
  db: TransactionListDb
  openModal: () => void
  setSelectedTransaction: Dispatch<SetStateAction<TransactionData | undefined>>
}

const TransactionList = ({ db, openModal, setSelectedTransaction }: Props) => {
  const [toggle, triggerFilterToggle] = useToggle()
  const transactionType = toggle.toggle
  const [listTransaction] = useTransactionList({ db, transactionType, openModal })
  return (
    <>
      <Filter>
        <ToggleBtn triggerToggle={triggerFilterToggle} toggle={toggle} />
      </Filter>
      <List>
        {listTransaction.map(transaction => {
          // eslint-disable-next-line no-unused-vars
          const [dia, mes, ano] = splitDate(transaction.date)

          return (
            <TransactionItem key={transaction.id}>
              <Item gridArea="A">{formatNumber(transaction.amount)}</Item>
              <Item gridArea="C">{transaction.category}</Item>
              <Item gridArea="D">{`${dia}/${mes}`}</Item>
              <Item gridArea="I">
                <EditIcon
                  onClick={() => {
                    openModal();
                    setSelectedTransaction(transaction);
                  }}
                />
              </Item>
            </TransactionItem>
          )
        })}
      </List>
    </>
  );
}

export default TransactionList