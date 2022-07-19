import { FC, ReactNode } from "react";

type Props = {
  text: string;
  children: ReactNode;
  // handelClick: any
  // transaction: TransactionType
};

export const PrimaryButton: FC<Props> = ({ text, children }: Props) => {
  return (
    <div
      className={"primary__button-" + text}
    /* onClick={()=>handelClick(transaction)} */
    >
      {children} {text}
    </div>
  );
};
