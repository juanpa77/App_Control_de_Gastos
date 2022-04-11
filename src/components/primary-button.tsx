
type Props = {
    text: string,
    children:JSX.Element
    // handelClick: any
    // transaction: TransactionType
  };

export const PrimaryButton: React.FC<Props> = ({ text, children}: Props)=> {
    
    return (
        <div 
             className={"primary__button-"+text}
            /* onClick={()=>handelClick(transaction)} */  >
                {children} {text}
        </div>
    )
}