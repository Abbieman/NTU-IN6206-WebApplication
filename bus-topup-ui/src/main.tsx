import Cookies from "js-cookie";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { useWebSocketNotification } from "./hooks/useWebSocketNotification";
import "./index.css";
import router from "./router/index";

function RootApp() {
  const userId = Cookies.get("userId") || undefined;
  // 登录时建立 WebSocket 连接
  const { Notification } = useWebSocketNotification(userId);
  return (
    <>
      <RouterProvider router={router} />
      {Notification}
    </>
  );
}

export default RootApp;

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
