import {PProps} from "./P.props"
import cn from "classnames"
import styles from "./P.module.css"
export const Ptag = ({size, children, ...props}: PProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, {
        [styles.m]: size == "m",
        [styles.l]: size == "l",
        [styles.s]: size == "s",
      })}
      {...props}
    >
      {children}
    </p>
  )
}
