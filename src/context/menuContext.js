import { createContext } from "react";

// Shares the loaded menu (and its loading / error state) with every component that needs it.
export const MenuContext = createContext(null);
