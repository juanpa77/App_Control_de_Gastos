import { RadioBtn, Wrapper } from './styled';
import useToggle from './useToggle';

export const ToggleBtn = () => {
  const [isActive, handleToggle] = useToggle()

  return (
    <Wrapper>
      <RadioBtn
        toggle={isActive}
        onClick={() => handleToggle('Icome')}
      >
        Icome
      </RadioBtn>
      <RadioBtn
        toggle={!isActive}
        onClick={() => handleToggle('Expenses')}
      >
        Expenses
      </RadioBtn>
    </Wrapper>
  );
};
