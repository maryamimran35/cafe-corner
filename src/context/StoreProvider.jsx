import { useEffect, useState } from "react";
import { StoreContext } from "./storeContext";
import { checkStoreOpen, getMinutesOfDay, parseClockTime } from "../utils/openingRule";

function StoreProvider({ children }) {
  // The real time of day, refreshed every 30 seconds
  const [realMinutes, setRealMinutes] = useState(() => getMinutesOfDay(new Date()));
  // Demo control: a time typed by the tester ("" means use the real time)
  const [simulatedTime, setSimulatedTime] = useState("");
  // True when the customer chose to schedule an order for the next opening
  const [scheduled, setScheduled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setRealMinutes(getMinutesOfDay(new Date())), 30000);
    // Cleanup: stop the timer when this component is removed
    return () => clearInterval(timer);
  }, []);

  // Derived values: worked out from state on every render
  const simulatedMinutes = parseClockTime(simulatedTime);
  const minutes = simulatedMinutes === null ? realMinutes : simulatedMinutes;
  const status = checkStoreOpen(minutes);
  // Ordering is allowed while open, or when the order is scheduled for the next opening
  const orderingAllowed = status.open || scheduled;

  const value = {
    status,
    scheduled,
    setScheduled,
    orderingAllowed,
    simulatedTime,
    setSimulatedTime,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export default StoreProvider;
