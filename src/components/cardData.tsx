
export const CardData = (props: { name: string; value: number; tipeData: string; }) => {
    const {name, value, tipeData} = props;
    return(
        <div className={name}>
            <div className="cardData-text">{tipeData}</div>
            <div className="containerNumber">{value}</div>
        </div>
    )
}
