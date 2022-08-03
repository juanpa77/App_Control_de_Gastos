import { Filter, RadioBtn, Wrapper } from './styled';
interface Props {
  triggerToggle: () => void;
  toggle: Filter;
}

export const ToggleBtn = ({ triggerToggle, toggle }: Props) => {

  return (
    <Wrapper>
      <RadioBtn
        toggle={toggle.toggle}
        rigth={toggle.rigth}
        left={toggle.left}
        onClick={triggerToggle}
      >
        Icome
      </RadioBtn>
      <RadioBtn
        toggle={!toggle.toggle}
        rigth={toggle.rigth}
        left={toggle.left}
        onClick={triggerToggle}
      >
        Expenses
      </RadioBtn>
    </Wrapper>
  );
};
