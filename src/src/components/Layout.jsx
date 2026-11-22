import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "./Toast";

function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main className="container page">
        {/* The key changes with the URL (path and ?category=...), so each new page plays the fade-in animation */}
        <div key={location.pathname + location.search} className="page-enter">
          {/* Outlet shows whichever page matches the current URL */}
          <Outlet />
        </div>
      </main>
      <Footer />
      <Toast />
    </>
  );
}

export default Layout;
