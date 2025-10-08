import { Outlet, NavLink } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";

export default function PymeBotLayout() {

  const [role, setRole] = useState("user")

  const menuItemsAdmin = [
    { name: 'Dashboard',           icon: '📊', to: 'dashboard' },
    { name: 'Catálogo de Productos', icon: '📦', to: 'products' },
    { name: 'Inventario',          icon: '📦', to: 'inventory' },
    { name: 'Clientes',            icon: '👥', to: 'customers' },
    { name: 'Reportes',            icon: '📈', to: 'reports' },
    { name: 'Configuración',       icon: '⚙️', to: 'settings' },
  ];

  const menuItemsUser = [
    { name: 'Dashboard',           icon: '📊', to: 'dashboard' },
    { name: 'Catálogo de Productos', icon: '📦', to: 'products' },
    { name: 'Inventario',          icon: '📦', to: 'inventory' },
    // Colocar los necesarios
  ];

  if (role === "admin"){
    menuItems = menuItemsAdmin
  }

  

  async function authMe(){
    try {
      const response = await api.post('/api/auth/me',{
        token: localStorage.getItem("token")
      })
      // Esto deberia traer la informacion del usuario, especificamente el rol

      setRole(response.data.rol??"user")

    } catch (error) {
      
    }
  }


  useEffect(() => {
    authMe()
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-green-700 text-white w-64 p-4">
        <h1 className="text-2xl font-bold mb-6">MiPymeBot</h1>
        <nav className="space-y-2">
          {
            role === "admin" ? (menuItemsAdmin.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg ${
                    isActive ? "bg-green-800" : "hover:bg-green-600"
                  }`
                }
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))):(menuItemsUser.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg ${
                    isActive ? "bg-green-800" : "hover:bg-green-600"
                  }`
                }
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            )))
          }
          
        </nav>
      </aside>

      {/* Panel dinámico */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet /> {/* ← aquí se montan /dashboard, /products, etc. */}
      </main>
    </div>
  );
}