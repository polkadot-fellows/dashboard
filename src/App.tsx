import { HashRouter } from "react-router-dom"
import "./App.scss"
import { SideMenu } from "SideMenu"

export const App = () => (
  <HashRouter basename="/">
    <SideMenu />
  </HashRouter>
)
