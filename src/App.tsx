import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "@/pages/RootLayout";
import ErrorPage from "@/pages/Error";
import Home, { loader as projectsLoader } from "@/pages/Home";
const ProjectDetails = lazy(() => import("@/pages/ProjectDetails"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: projectsLoader },
      {
        path: "/projects/:id",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProjectDetails />
          </Suspense>
        ),
        loader: async (args) => {
          const loaderFn = (await import("@/pages/ProjectDetails")).loader;
          if (!loaderFn) return null;
          return await loaderFn(args);
        },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
