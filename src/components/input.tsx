export const Input = (props: { inputType: string }) => {
  const { inputType } = props;

  return <input className={"input__" + inputType} type={inputType} />;
};
