import {ButtonProps} from "./Button.props"
import styles from "./Button.module.css"
import ArrowIcon from "./arrow.svg"
import cn from "classnames"
import {useState} from "react"
export const Button = ({
  appearance,
  children,
  arrow,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance == "primary",
        [styles.ghost]: appearance == "ghost",
      })}
      {...props}
    >
      {children}
      {arrow !== "none" && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow == "down",
            [styles.right]: arrow == "right",
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </button>
  )
}
