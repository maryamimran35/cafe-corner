import { useEffect, useRef, useState } from "react";
import { MenuContext } from "./menuContext";
import { loadMenu } from "../services/menuService";

// Loads the menu once when the app starts, and again every time reload() is called.
function MenuProvider({ children }) {
  // attempt counts the loads: 0 is the first, each reload() adds one
  const [attempt, setAttempt] = useState(0);
  // The demo setting shown in the footer. modeRef holds the same value for the loader to read,
  // so changing the setting does NOT reload by itself: it applies to the next load.
  const [demoMode, setDemoMode] = useState("normal");
  const modeRef = useRef("normal");
  // The latest outcome, remembered together with the attempt it belongs to
  const [result, setResult] = useState({ attempt: -1, items: [], error: "" });

  useEffect(() => {
    // Set to true in the cleanup, so an old request can never overwrite a newer one
    let ignore = false;

    async function load() {
      try {
        const items = await loadMenu({ mode: modeRef.current });
        if (!ignore) setResult({ attempt, items, error: "" });
      } catch (error) {
        if (!ignore) setResult({ attempt, items: [], error: error.message });
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [attempt]);

  // Derived value: still "loading" until the result for the current attempt arrives
  const status = result.attempt !== attempt ? "loading" : result.error ? "error" : "ready";

  function reload() {
    setAttempt((previous) => previous + 1);
  }

  function chooseDemoMode(mode) {
    modeRef.current = mode;
    setDemoMode(mode);
  }

  const value = {
    items: status === "ready" ? result.items : [],
    status,
    error: result.error,
    reload,
    demoMode,
    chooseDemoMode,
  };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export default MenuProvider;
