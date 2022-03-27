type Props = {
    text: string,
    children:JSX.Element
  };

export const PrimaryButton: React.FC<Props> = ({ text, children}: Props)=> {
    // const {text}=props;
    
    return (
        <div className={"primary__button-"+text}>{children} {text}</div>
    )
}