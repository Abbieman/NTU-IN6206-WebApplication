import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../pages/layout";
import Login from "../pages/login";
import Messages from "../pages/messages";
import MyCard from "../pages/my-card";
import Profile from "../pages/profile";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to="/my-card" replace={true} />,
      },
      {
        path: "/my-card",
        element: <MyCard />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
