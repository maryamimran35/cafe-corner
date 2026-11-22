import { useContext } from "react";
import { CartContext } from "./cartContext";

// Custom hook: any component can call useCart() to get the cart and its actions.
export function useCart() {
  const value = useContext(CartContext);
  if (value === null) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return value;
}
