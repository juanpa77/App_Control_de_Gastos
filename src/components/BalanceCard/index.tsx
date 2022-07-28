import { Idb } from "../../utility/IDB";
import { formatNumber } from "../../utility/formatDate";
import useBalance from "./useBalance";
import { Item, Line, NumberItem, WrapperCard, WrapperItem } from "./styled";

export const Balance = (props: { db: Idb; dateRanges: string }) => {
  const [available, income, expenses, dateRanges] = useBalance(props)

  return (
    <WrapperCard>
      <WrapperItem>
        <Item>{"Disponible " + dateRanges}</Item>
        <NumberItem>{formatNumber(available)}</NumberItem>
      </WrapperItem>
      <Line />
      <WrapperItem direction="row">
        <WrapperItem>
          <Item>Ingresos</Item>
          <NumberItem>{formatNumber(income)}</NumberItem>
        </WrapperItem>
        <WrapperItem>
          <Item>Gastos</Item>
          <NumberItem>{formatNumber(expenses)}</NumberItem>
        </WrapperItem>
      </WrapperItem>
    </WrapperCard>
  )
}
