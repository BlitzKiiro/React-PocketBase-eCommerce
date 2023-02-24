import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error page";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import Register from "../pages/register";
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
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
