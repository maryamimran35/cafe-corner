import { useContext } from "react";
import { StoreContext } from "./storeContext";

export function useStore() {
  const value = useContext(StoreContext);
  if (value === null) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return value;
}
