import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import StoreProvider from "./context/StoreProvider.jsx";
import MenuProvider from "./context/MenuProvider.jsx";
import CartProvider from "./context/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* StoreProvider is outside CartProvider because the cart needs the open/closed status; MenuProvider is too, because the cart checks items against the loaded menu */}
      <StoreProvider>
        <MenuProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </MenuProvider>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
);
