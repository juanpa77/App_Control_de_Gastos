import { ReactComponent as EditIcon } from '../../asset/icons/editIcon.svg'
import { Dispatch, SetStateAction } from "react";
import { TransactionData } from "../transaction-form/useTransaction";
import { TransactionListDb } from "./services/getTransactionList";
import useTransactionList from "./hooks/useTransactionList";
import useToggle from "../buttons/toggle-btn/useToggle";
import { FilterBtn, Item, List, TransactionItem, WrapperFilter } from "./styled";
import { formatNumber, formatNumberMonth, splitDate } from "../../utility/formatDate";
import { ToggleBtn } from '../buttons/toggle-btn';
import DateFilter from '../buttons/filter';
import useFilterDate from './hooks/useFilterDate';
import { Wrapper } from '../buttons/filter/styled';
import { arrayGenerator } from '../../utility/arrayGenerator';
import { useCategoryContex } from '../../hooks/useContex';

type Props = {
  db: TransactionListDb
  openModal: () => void
  setSelectedTransaction: Dispatch<SetStateAction<TransactionData | undefined>>
}

export interface Filters {
  type: string
  week: string
  month: string
  category: string
}

const TransactionList = ({ db, openModal, setSelectedTransaction }: Props) => {
  const categories = useCategoryContex()
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const weeks = arrayGenerator(4, 'todas')

  const [filterWeek, updateFilterWeek] = useFilterDate(weeks[4])
  const [filter, updateFilter] = useFilterDate(months[new Date().getMonth()])
  const [categoryFilter, updateCategoryFilter] = useFilterDate(categories.category[0])
  const [toggle, triggerFilterToggle] = useToggle()

  const filters: Filters = {
    week: filterWeek,
    month: formatNumberMonth(months.indexOf(filter)),
    type: toggle.toggle ? 'Income' : 'Expenses',
    category: categoryFilter
  }

  const [listTransaction] = useTransactionList({ db, openModal, filters })

  return (
    <>
      <FilterBtn>
        <ToggleBtn
          triggerToggle={triggerFilterToggle}
          toggle={toggle}
        />
      </FilterBtn>
      <WrapperFilter>
        <Wrapper>
          {'Mes'}
          <DateFilter
            change={updateFilter}
            dateSelected={filter}
            options={months}
          />
        </Wrapper>
        <Wrapper>
          {'Semana'}
          <DateFilter
            change={updateFilterWeek}
            dateSelected={filterWeek}
            options={weeks}
          />
        </Wrapper>
        <Wrapper>
          {'Categoria'}
          <DateFilter
            change={updateCategoryFilter}
            dateSelected={categoryFilter}
            options={categories.category}
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