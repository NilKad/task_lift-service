import { Outlet } from "react-router-dom"
import { Header } from "../components/Header/Header"
import * as SC from "./SharedLayout.styled"


export const SharedLayout = () => {
  return <SC.Main>
    <Header />
    < Outlet />
  </SC.Main>



}