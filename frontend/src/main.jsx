import "./index.css"

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App'; 
import Login from './pages/Login';
import Register from './pages/Register';

import React from 'react'
import ReactDOM from 'react-dom/client'
import PymeBot from "./pages/PymeBot";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pymebot" element={<PymeBot />}  />

    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);