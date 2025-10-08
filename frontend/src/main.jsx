import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

import Login           from "./pages/Login";
import Register        from "./pages/Register";
import ProtectedRoute  from "./components/ProtectedRoute"; // opción protegida
import PymeBotLayout   from "./layouts/PymeBotLayout";

// páginas que irán dentro del layout
import Dashboard  from "./pages/Dashboard";
import Products   from "./pages/Products";
import Inventory  from "./pages/Inventory";   
import Customers  from "./pages/Customers";
import Reports    from "./pages/Reports";
import Settings   from "./pages/Settings";

const router = createBrowserRouter([
  { path: "/",    element: <Login /> },
  { path: "/login",    element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/pymebot",
    element: <ProtectedRoute><PymeBotLayout /></ProtectedRoute>,
    children: [
      { index: true,        element: <Dashboard /> }, // /pymebot
      { path: "dashboard", element: <Dashboard /> },
      { path: "products",  element: <Products /> },
      { path: "inventory", element: <Inventory /> }, // ← nuevo nombre
      { path: "customers", element: <Customers /> },
      { path: "reports",   element: <Reports /> },
      { path: "settings",  element: <Settings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);