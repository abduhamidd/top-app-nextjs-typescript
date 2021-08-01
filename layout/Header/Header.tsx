import {HeaderProps} from "./Header.props";
import "./Header.module.css";
export const Header = ({...props}: HeaderProps) => {
  return <div {...props}>Header</div>;
};
