import { ReactComponent as EditIcon } from '../../asset/icons/editIcon.svg'
import { Dispatch, SetStateAction } from "react";
import { TransactionData } from "../transaction-form/useTransaction";
import { TransactionListDb } from "./services/getTransactionList";
import useTransactionList from "./hooks/useTransactionList";
import useToggle from "../buttons/toggle-btn/useToggle";
import { Filter, Item, List, TransactionItem } from "./styled";
import { formatNumber, splitDate } from "../../utility/formatDate";
import { ToggleBtn } from '../buttons/toggle-btn';
import DateFilter from '../buttons/filter/date';
import useFilterDate from './hooks/useFilterDate';
import { Wrapper } from '../buttons/filter/date/styled';
import { arrayGenerator } from '../../utility/arrayGenerator';
import { getWeek } from './services/filterDate';

type Props = {
  db: TransactionListDb
  openModal: () => void
  setSelectedTransaction: Dispatch<SetStateAction<TransactionData | undefined>>
}

const TransactionList = ({ db, openModal, setSelectedTransaction }: Props) => {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const weeks = arrayGenerator(4, 'todas')
  const [filterWeek, updateFilterWeek] = useFilterDate(getWeek(new Date().getDate()).toString())

  const [toggle, triggerFilterToggle] = useToggle()
  const transactionType = toggle.toggle
  const [filter, updateFilter] = useFilterDate(months[new Date().getMonth()])
  const filterMonth = months.indexOf(filter) + 1
  const [listTransaction] = useTransactionList({ db, transactionType, openModal, filterMonth, filterWeek })

  return (
    <>
      <Filter>
        <ToggleBtn
          triggerToggle={triggerFilterToggle}
          toggle={toggle}
        />
      </Filter>
      <Wrapper>
        {'Mes'}
        <DateFilter
          change={updateFilter}
          dateSelected={filter}
          filter={months}
          dateType={''}
        />
      </Wrapper>
      <Wrapper>
        {'Semana'}
        <DateFilter
          change={updateFilterWeek}
          dateSelected={filterWeek}
          filter={weeks}
          dateType={''}
        />
      </Wrapper>
      <List>
        {listTransaction.map(transaction => {
          // eslint-disable-next-line no-unused-vars
          const { day, month, year } = splitDate(transaction.date)

          return (
            <TransactionItem key={transaction.id}>
              <Item gridArea="A">{formatNumber(transaction.amount)}</Item>
              <Item gridArea="C">{transaction.category}</Item>
              <Item gridArea="D">{`${day}/${month}`}</Item>
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