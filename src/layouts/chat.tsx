import { PropsWithChildren } from "react";

export default function LayoutDefault({ children }: PropsWithChildren) {
  return (<div className="layout">{children}</div>
  )
}