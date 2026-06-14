import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}



export default AppLayout
