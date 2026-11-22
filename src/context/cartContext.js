import { createContext } from "react";

// The shared cart "channel". CartProvider fills it, useCart reads it.
export const CartContext = createContext(null);
