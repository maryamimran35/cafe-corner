import { Clock, MapPin, Phone, Truck } from "lucide-react";
import { STORE } from "../data/storeInfo";
import { formatTime } from "../utils/format";

function ContactPage() {
  return (
    <>
      <h1>Contact and hours</h1>
      <p className="intro">Find us, call us, or check when and where we deliver.</p>

      <div className="info-grid">
        <section className="info-card" aria-labelledby="hours-heading">
          <Clock aria-hidden="true" className="info-icon" />
          <h2 id="hours-heading">Opening hours</h2>
          <p>
            Every day, {formatTime(STORE.openMinutes)} to {formatTime(STORE.closeMinutes)}.
          </p>
          <p>Last order at {formatTime(STORE.lastOrderMinutes)}.</p>
        </section>

        <section className="info-card" aria-labelledby="visit-heading">
          <MapPin aria-hidden="true" className="info-icon" />
          <h2 id="visit-heading">Visit us</h2>
          <p>{STORE.address}</p>
          <p>Pickup orders are collected from the counter.</p>
        </section>

        <section className="info-card" aria-labelledby="delivery-heading">
          <Truck aria-hidden="true" className="info-icon" />
          <h2 id="delivery-heading">Delivery areas</h2>
          <p>We deliver to sectors {STORE.deliveryAreas.join(", ")}.</p>
        </section>

        <section className="info-card" aria-labelledby="call-heading">
          <Phone aria-hidden="true" className="info-icon" />
          <h2 id="call-heading">Call us</h2>
          <p>{STORE.phone}</p>
        </section>
      </div>
    </>
  );
}

export default ContactPage;
