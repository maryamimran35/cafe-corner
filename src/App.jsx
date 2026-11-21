import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import MenuPage from "./pages/MenuPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Layout (navbar + footer) wraps every page below */}
      <Route element={<Layout />}>
        <Route path="/" element={<MenuPage />} />
        <Route path="/items/:id" element={<ItemDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;