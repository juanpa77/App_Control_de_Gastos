import { formatNumber, splitDate } from "../../utility/formatDate";
import { ReactComponent as EditIcon } from "../../asset/icons/editIcon.svg";
import { Dispatch, SetStateAction } from "react";
import { TransactionData } from "../transaction-form/useTransaction";
interface Props {
  transaction: TransactionData;
  openModal: () => void;
  setTransaction: Dispatch<
    SetStateAction<TransactionData | undefined>
  >;
}

export const CardTransaction = ({
  transaction,
  openModal,
  setTransaction,
}: Props) => {
  // const {amount, category, date} = transaction;
  const [dia, mes, ano] = splitDate(transaction.date);
  return (
    <>
      <div className="card__transaction-amount">
        {formatNumber(transaction.amount)}
      </div>
      <div className="card__transaction-category">{transaction.category}</div>
      <div className="card__transaction-date">{`${dia}/${mes}`}</div>
      <div className="editIcon">
        <EditIcon
          onClick={() => {
            openModal();
            setTransaction(transaction);
          }}
        />
      </div>
    </>
  );
};
