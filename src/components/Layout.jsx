import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import NavShowcase from "./NavShowcase";
import Footer from "./Footer";
import Toast from "./Toast";

function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {location.pathname === "/" && <NavShowcase />}
      <main className="container page">
        <div key={location.pathname + location.search} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <Toast />
    </>
  );
}

export default Layout;
