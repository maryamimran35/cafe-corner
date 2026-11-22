import { useMenu } from "../context/useMenu";

// Wraps a page that needs the menu. It shows a loading message or an error with a Try again button,
// and only shows the page itself once the menu is ready.
function MenuGate({ children }) {
  const { status, error, reload } = useMenu();

  if (status === "loading") {
    return (
      <div className="loading-box" role="status">
        <span className="spinner" aria-hidden="true" />
        <p>Loading the menu...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="error-box" role="alert">
        <h1>We could not load the menu</h1>
        <p>{error}</p>
        <button type="button" className="btn btn-primary" onClick={reload}>
          Try again
        </button>
      </div>
    );
  }

  return children;
}

export default MenuGate;
