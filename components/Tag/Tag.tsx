import {TagProps} from "./Tag.props"
import cn from "classnames"
import styles from "./Tag.module.css"
export const Tag = ({
  size,
  children,
  color,
  href,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, {
        [styles.m]: size == "m",
        [styles.s]: size == "s",
        [styles.ghost]: color == "ghost",
        [styles.red]: color == "red",
        [styles.green]: color == "green",
        [styles.grey]: color == "grey",
        [styles.primary]: color == "primary",
      })}
      {...props}
    >
      {href ? <a href={href}></a> : <></>}
      {children}
    </div>
  )
}
