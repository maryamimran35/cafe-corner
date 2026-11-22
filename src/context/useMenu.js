import { useContext } from "react";
import { MenuContext } from "./menuContext";

// Custom hook: returns { items, status, error, reload, demoMode, chooseDemoMode }.
// status is "loading", "error" or "ready"; items is empty unless status is "ready".
export function useMenu() {
  const value = useContext(MenuContext);
  if (value === null) {
    throw new Error("useMenu must be used inside MenuProvider");
  }
  return value;
}
