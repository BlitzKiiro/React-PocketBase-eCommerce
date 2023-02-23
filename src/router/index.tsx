import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErroPage";
import Home from "../pages/home";
import Root from "../pages/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <div>Hello contact!</div>,
      },
    ],
  },
]);

export default router;
