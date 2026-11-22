import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p>That page does not exist.</p>
      <Link className="btn btn-primary" to="/">
        Back to the menu
      </Link>
    </>
  );
}

export default NotFoundPage;
