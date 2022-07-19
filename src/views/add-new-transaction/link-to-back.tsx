import { Link } from "react-router-dom";
type Props = {
  linkTo: string
}

export const LinkBack = ({ linkTo }: Props) => {
  return <Link to={linkTo}>Click me</Link>;
};
