import { HashRouter } from "react-router-dom"
import "./App.scss"
import { RouterInner } from "RouterInner"

export const App = () => (
  <HashRouter basename="/">
    <RouterInner />
  </HashRouter>
)
