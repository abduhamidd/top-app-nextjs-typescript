import {ReactNode, DetailedHTMLProps, HTMLAttributes} from "react"
export interface PProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size: "m" | "l" | "s"
  children: ReactNode
}
