import { ErrorResponse, useRouteError, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  let title = "Error Occured";
  let message = "Something went wrong.";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "404 Page Not Found";
    message = "Could not find requested page.";
  }

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Navbar />
      <h1>{title}</h1>
      <p>{message}</p>
      <p>
        <Link to="/">Return to Home Page</Link>
      </p>
    </main>
  );
}
