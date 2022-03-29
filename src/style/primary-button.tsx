type Props = {
    text: string,
    children:JSX.Element
    handelClick: any
  };

export const PrimaryButton: React.FC<Props> = ({ text, handelClick, children}: Props)=> {
    // const {text}=props;
    
    return (
        <div 
            className={"primary__button-"+text}
            onClick={handelClick} >
                {children} {text}
        </div>
    )
}