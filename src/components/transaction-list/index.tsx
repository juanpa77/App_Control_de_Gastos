import { ReactComponent as EditIcon } from '../../asset/icons/editIcon.svg'
import { Dispatch, SetStateAction } from "react";
import { TransactionData } from "../transaction-form/useTransaction";
import { TransactionListDb } from "./services/getTransactionList";
import useTransactionList from "./hooks/useTransactionList";
import useToggle from "../buttons/toggle-btn/useToggle";
import { Filter, Item, List, TransactionItem, WrapperFilter } from "./styled";
import { formatNumber, splitDate } from "../../utility/formatDate";
import { ToggleBtn } from '../buttons/toggle-btn';
import DateFilter from '../buttons/filter/date';
import useFilterDate from './hooks/useFilterDate';
import { Wrapper } from '../buttons/filter/date/styled';
import { arrayGenerator } from '../../utility/arrayGenerator';
import { getWeek } from './services/filterDate';
import { useCategoryContex } from '../../hooks/useContex';

type Props = {
  db: TransactionListDb
  openModal: () => void
  setSelectedTransaction: Dispatch<SetStateAction<TransactionData | undefined>>
}

const TransactionList = ({ db, openModal, setSelectedTransaction }: Props) => {
  const category = useCategoryContex()
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const weeks = arrayGenerator(4, 'todas')
  const [filterWeek, updateFilterWeek] = useFilterDate(getWeek(new Date().getDate()).toString())
  const [filter, updateFilter] = useFilterDate(months[new Date().getMonth()])
  const [categoryFilter, updateCategoryFilter] = useFilterDate(category.category[0])

  const [toggle, triggerFilterToggle] = useToggle()
  const transactionType = toggle.toggle
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
      <WrapperFilter>
        <Wrapper>
          {'Mes'}
          <DateFilter
            change={updateFilter}
            dateSelected={filter}
            filter={months}
          />
        </Wrapper>
        <Wrapper>
          {'Semana'}
          <DateFilter
            change={updateFilterWeek}
            dateSelected={filterWeek}
            filter={weeks}
          />
        </Wrapper>
        <Wrapper>
          {'Categoria'}
          <DateFilter
            change={updateCategoryFilter}
            dateSelected={categoryFilter}
            filter={category.category}
          />
        </Wrapper>
      </WrapperFilter>
      <List>
        {listTransaction.map(transaction => {
          const { day, month } = splitDate(transaction.date)
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