import { useStore } from "../context/useStore";
import { useMenu } from "../context/useMenu";

function Footer() {
  const { simulatedTime, setSimulatedTime } = useStore();
  const { demoMode, chooseDemoMode, reload } = useMenu();

  return (
    <footer className="site-footer">
      <div className="container">
        <p>Cafe Corner, Islamabad. Delivery to H-10 to H-12 and I-8 to I-11, or pickup.</p>
        <p>This is a student project. Orders are simulated and no real food or payment is involved.</p>

        {/* Demo control: lets a tester try the opening-hours rule at any time of day */}
        <details className="demo-panel">
          <summary>Demo controls (for testing only)</summary>
          <p>Pretend it is a different time to try the opening-hours rule.</p>
          <div className="demo-row">
            <label htmlFor="demo-time">Pretend the time is</label>
            <input
              id="demo-time"
              type="time"
              value={simulatedTime}
              onChange={(event) => setSimulatedTime(event.target.value)}
            />
            <button type="button" className="btn btn-secondary" onClick={() => setSimulatedTime("")}>
              Use real time
            </button>
          </div>
          <p>{simulatedTime ? `Using simulated time ${simulatedTime}.` : "Using the real time."}</p>

          <p>Try the loading states: pick what the next menu load does, then reload it.</p>
          <div className="demo-row">
            <label htmlFor="demo-menu">Next menu load</label>
            <select id="demo-menu" value={demoMode} onChange={(event) => chooseDemoMode(event.target.value)}>
              <option value="normal">Works normally</option>
              <option value="fail">Fails</option>
              <option value="empty">Returns an empty menu</option>
            </select>
            <button type="button" className="btn btn-secondary" onClick={reload}>
              Reload menu now
            </button>
          </div>
        </details>
      </div>
    </footer>
  );
}

export default Footer;
