import { Clock } from "lucide-react";
import { STORE } from "../data/storeInfo";
import { formatTime } from "../utils/format";
import { useStore } from "../context/useStore";

function OpenStatus() {
  const { status, scheduled, setScheduled } = useStore();

  if (status.open) {
    return (
      <p className="open-status open-status-open">
        <Clock aria-hidden="true" />
        <span>
          <strong>Open now.</strong> Last order at {formatTime(STORE.lastOrderMinutes)}.
        </span>
      </p>
    );
  }

  if (scheduled) {
    return (
      <div className="open-status open-status-scheduled">
        <Clock aria-hidden="true" />
        <span>
          <strong>Scheduled.</strong> Your order will be for {status.nextOpenLabel}.
        </span>
        <button type="button" className="link-button" onClick={() => setScheduled(false)}>
          Cancel schedule
        </button>
      </div>
    );
  }

  return (
    <div className="open-status open-status-closed">
      <Clock aria-hidden="true" />
      <span>
        <strong>Closed.</strong> Opens {status.nextOpenLabel}. You can still browse the menu.
      </span>
      <button type="button" className="btn btn-secondary" onClick={() => setScheduled(true)}>
        Schedule for {status.nextOpenLabel}
      </button>
    </div>
  );
}

export default OpenStatus;
