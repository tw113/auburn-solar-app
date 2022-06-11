import { Outlet } from "react-router-dom";
import AppFooter from "../components/AppFooter/AppFooter";
import AppHeader from "../components/AppHeader/AppHeader";

const Layout = () => {
  return (
    <>
      <AppHeader></AppHeader>
      
      <Outlet />

      <AppFooter></AppFooter>
    </>
  )
};

export default Layout;