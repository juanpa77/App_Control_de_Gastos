import { RadioBtn, Wrapper } from './styled';
interface Props {
  triggerToggle: () => void;
  toggle: boolean;
}

export const ToggleBtn = ({ triggerToggle, toggle }: Props) => {

  return (
    <Wrapper>
      <RadioBtn toggle={toggle}
        onClick={triggerToggle}
      >
        Icome
      </RadioBtn>
      <RadioBtn toggle={!toggle}
        onClick={triggerToggle}
      >
        Expenses
      </RadioBtn>
    </Wrapper>
  );
};
