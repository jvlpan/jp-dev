import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "@/pages/RootLayout";
import ErrorPage from "@/pages/Error";
import Home, { loader as projectsLoader } from "@/pages/Home";
import ProjectDetails, {
  loader as projectDetailsLoader,
} from "@/pages/ProjectDetails";
import Cursor from "@/components/Cursor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: projectsLoader },
      {
        path: "/projects/:id",
        element: <ProjectDetails />,
        loader: projectDetailsLoader,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Cursor />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
