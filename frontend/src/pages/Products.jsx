import { useEffect, useState } from "react";
import api from "../services/api";
import AddProductModal from "../components/AddProductModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [categories, setCategories] = useState([])

  async function fetchCategories(){
    try {
      const response = await api.get("/api/categorias")
      setCategories(response.data)
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      setCategories([])
    }
  }

  

  const handleSaved = () => {
    // recarga la lista
    handleSearch();
  };

  const handleSearch = () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (stockFilter) params.stock = stockFilter;

    api
      .get("/products", { params })
      .then((res) => {
        const mapped = res.data.map((p) => ({
          id: p.id,
          name: p.nombre,
          stock_total: p.stock_total,
          categoria: p.categoria,
          precio_menor: p.precio_menor,
          imagen: p.imagen
        }));
        setProducts(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (stockFilter) params.stock = stockFilter;

    setLoading(true);
    api
        .get("/products", { params })
        .then((res) => {
          console.log('Productos crudos:', res.data); 
          const mapped = res.data.map((p) => ({
            id: p.id,
            name: p.nombre,           
            stock_total: p.stock,     
            categoria: p.cat_nombre,  
            precio_menor: p.precio_venta, 
            imagen: p.imagen 
          }));
          setProducts(mapped);
          setLoading(false);
        })
        .catch((err) => {
        console.error(err);
        setLoading(false);
        });
    }, [search, category, stockFilter]);

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDelete = (id, name) => {
    if (!window.confirm(`¿Eliminar "${name}"?`)) return;
    api
      .delete(`/products/${id}`)
      .then(() => setProducts((prev) => prev.filter((p) => p.id !== id)))
      .catch((err) => alert("Error al eliminar"));
  };

  if (loading) return <p className="text-gray-600">Cargando productos...</p>;

  if (!loading && products.length === 0)
    return (
        <div>
        {/* Filtros rápidos */}
        <div className="flex gap-4 mb-4">
        <select
            className="px-3 py-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
        </select>

        <select
            className="px-3 py-2 border rounded"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
        >
            <option value="">Todo el stock</option>
            <option value="low">Stock bajo</option>
            <option value="out">Agotado</option>
        </select>
        </div>

        <p className="text-gray-500">No se encontraron productos.</p>
        </div>
    );

  return (
    <div>
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Catálogo de Productos</h2>
        <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
        <span>+</span> Añadir Producto
        </button>

        {showModal && (
        <AddProductModal
            onClose={() => setShowModal(false)}
            onSaved={handleSaved}
        />
        )}
      </div>

      {/* Buscador real */}
      <div className="flex gap-2 mb-4">
        <input
            type="text"
            placeholder="Buscar producto..."
            className="flex-1 px-3 py-2 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
            🔍 Buscar
        </button>
      </div>

      {/* Filtros rápidos */}
      <div className="flex gap-4 mb-4">
        <select
            className="px-3 py-2 border rounded"
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value="">Todas las categorías</option>
            <option value="1">Ropa</option>
            <option value="2">Zapatos</option>
            <option value="3">Accesorios</option>
        </select>

        <select
            className="px-3 py-2 border rounded"
            onChange={(e) => setStockFilter(e.target.value)}
        >
            <option value="">Todo el stock</option>
            <option value="low">Stock bajo</option>
            <option value="out">Agotado</option>
        </select>
      </div>
      
      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* Imagen placeholder */}
            <img
              key={p.imagen}
              src={p.imagen ? p.imagen : '/img/default-product.png'}
              alt={p.nombre}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              {/* Nombre + stock */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{p.name}</h3>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    p.stock_total <= 5
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  Stock: {p.stock_total}
                </span>
              </div>

              {/* Categoría + precio */}
              <p className="text-sm text-gray-600 mb-1">{p.categoria}</p>
              <p className="text-xl font-semibold text-gray-900">
                s/ {Number(p.precio_menor || 0).toFixed(2)}
              </p>

              {/* Acciones */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => alert("Edición próximamente")}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.name)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}