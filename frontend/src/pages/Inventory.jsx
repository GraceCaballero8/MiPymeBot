import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const loadInventory = (query = "") => {
    setLoading(true);
    setError("");
    const params = {};
    if (query) params.search = query;
    api
      .get("/products", { params })
      .then((res) => {
        setItems(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar el inventario");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const totalSKUs = items.length;
  const totalUnits = useMemo(
    () => items.reduce((acc, p) => acc + Number(p.stock_total || 0), 0),
    [items]
  );

  if (loading) return <p className="text-gray-600">Cargando inventario...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Inventario</h2>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="flex-1 px-3 py-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && loadInventory(search)}
        />
        <button
          onClick={() => loadInventory(search)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Buscar
        </button>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-100 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-white rounded-lg border p-3">
          <p className="text-xs text-gray-500">SKUs</p>
          <p className="text-xl font-semibold">{totalSKUs}</p>
        </div>
        <div className="bg-white rounded-lg border p-3">
          <p className="text-xs text-gray-500">Unidades totales</p>
          <p className="text-xl font-semibold">{totalUnits}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No hay productos en inventario.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left font-medium px-4 py-2">Producto</th>
                <th className="text-left font-medium px-4 py-2">Categoría</th>
                <th className="text-right font-medium px-4 py-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2 text-gray-800">{p.name}</td>
                  <td className="px-4 py-2 text-gray-600">{p.categoria}</td>
                  <td className="px-4 py-2 text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        Number(p.stock_total || 0) <= 5
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {Number(p.stock_total || 0)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}