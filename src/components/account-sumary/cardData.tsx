type Props = {
  name: string
  value: string
  tipeData: string
}

export const CardData = ({ name, tipeData, value }: Props) => {
  return (
    <div className={name}>
      <div className="cardData-text">{tipeData}</div>
      <div className="containerNumber">{value}</div>
    </div>
  );
};
