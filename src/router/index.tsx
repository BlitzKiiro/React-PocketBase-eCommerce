import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ErrorPage from "../pages/error page";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import ProductDetails from "../pages/product details";
import Register from "../pages/register";
import Root from "../pages/root";
import UnAuthedRoute from "./UnAuthedRoute";
import AuthedRoute from "./AuthedRoute";

import { useEffect } from "react";

const AppRouter = () => {
  const { user } = useAuth();

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
          path: "/product/:id",
          element: <ProductDetails />,
        },
      ],
    },
    {
      path: "/auth",
      element: <UnAuthedRoute user={user} />,
      children: [
        {
          path: "/auth/login",
          element: <LoginPage />,
        },
        {
          path: "/auth/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
