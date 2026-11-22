import { createContext } from "react";

// Shares the store's open/closed status with every component that needs it.
export const StoreContext = createContext(null);
