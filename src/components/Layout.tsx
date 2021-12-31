import { ComponentPropsWithoutRef, ReactNode } from "react"
import Header from "./Header"

const Layout = ({ children, ...otherProps }: { children: ReactNode } & ComponentPropsWithoutRef<"main">) => {
  return (
    <>
      <Header />
      <main {...otherProps}>
        <div className="container">
          {children}
        </div>
      </main>
    </>
  )
}

export default Layout;