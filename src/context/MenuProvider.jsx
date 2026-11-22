import { useEffect, useRef, useState } from "react";
import { MenuContext } from "./menuContext";
import { loadMenu } from "../services/menuService";

function MenuProvider({ children }) {
  const [attempt, setAttempt] = useState(0);
  const [demoMode, setDemoMode] = useState("normal");
  const modeRef = useRef("normal");
  const [result, setResult] = useState({ attempt: -1, items: [], error: "" });

  useEffect(() => {
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
