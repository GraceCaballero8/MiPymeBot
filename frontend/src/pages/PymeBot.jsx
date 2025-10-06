import { useState } from 'react';

const PymeBot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Datos de productos
  const products = [
    {
      id: 1,
      name: 'Camiseta Básica',
      stock: 15,
      price: 39.90,
      image: 'https://via.placeholder.com/150x150?text=Camiseta'
    },
    {
      id: 2,
      name: 'Polo Sport',
      stock: 3,
      price: 45.00,
      image: 'https://via.placeholder.com/150x150?text=Polo',
      lowStock: true
    },
    {
      id: 3,
      name: 'Jeans Slim Fit',
      stock: 8,
      price: 89.90,
      image: 'https://via.placeholder.com/150x150?text=Jeans'
    }
  ];

  // Elementos del menú lateral
  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Catálogo de Productos', icon: '📦', active: true },
    { name: 'Pedidos', icon: '📋' },
    { name: 'Clientes', icon: '👥' },
    { name: 'Reportes', icon: '📈' },
    { name: 'Configuración', icon: '⚙️' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Botón para abrir/cerrar menú en móvil */}
      <button 
        className="md:hidden fixed top-4 left-4 z-20 bg-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Menú lateral */}
      <div className={`bg-green-700 text-white w-64 min-h-screen transition-all duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-10`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-8">MiPymeBot</h1>
          
          <nav>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <a 
                    href="#" 
                    className={`flex items-center p-3 rounded-lg ${item.active ? 'bg-green-800' : 'hover:bg-green-600'}`}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Encabezado */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Catálogo de Productos</h2>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center">
              <span className="mr-2">+</span> Añadir Producto
            </button>
          </div>

          {/* Lista de productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                      <p className="text-gray-600">Stock: {product.stock}</p>
                      {product.lowStock && (
                        <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                          Stock bajo
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">s/{product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <button className="text-green-600 hover:text-green-800 font-medium">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-800 font-medium">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PymeBot;