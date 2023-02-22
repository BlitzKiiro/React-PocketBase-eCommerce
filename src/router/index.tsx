import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErroPage";
import Root from "../pages/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/contact",
        element: <div>Hello contact!</div>,
      },
    ],
  },
]);

export default router;
