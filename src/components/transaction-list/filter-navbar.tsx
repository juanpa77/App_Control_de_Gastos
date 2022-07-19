import { ToggleBtn } from "../toggle-btn";

interface Props {
  triggerToggle: () => void;
  toggle: boolean;
}

export const NavbarFilter = ({ triggerToggle, toggle }: Props) => {
  return (
    <div className="navbar-filter">
      <ToggleBtn triggerToggle={triggerToggle} toggle={toggle} />
    </div>
  );
};
