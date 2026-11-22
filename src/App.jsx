import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import MenuGate from "./components/MenuGate";
import MenuPage from "./pages/MenuPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Layout (navbar + footer) wraps every page below */}
      <Route element={<Layout />}>
        <Route path="/" element={<MenuGate><MenuPage /></MenuGate>} />
        <Route path="/items/:id" element={<MenuGate><ItemDetailsPage /></MenuGate>} />
        <Route path="/cart" element={<MenuGate><CartPage /></MenuGate>} />
        <Route path="/checkout" element={<MenuGate><CheckoutPage /></MenuGate>} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
