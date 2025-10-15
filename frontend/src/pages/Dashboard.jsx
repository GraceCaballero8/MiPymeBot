import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([
      api.get("/products"),
      api.get("/customers"),
    ])
      .then(([prodRes, custRes]) => {
        setProducts(prodRes.data || []);
        setCustomers(custRes.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar el resumen");
        setLoading(false);
      });
  }, []);

  const totalProducts = products.length;
  const totalCustomers = customers.length;
  const lowStock = useMemo(
    () => products.filter((p) => Number(p.stock_total || 0) <= 5).length,
    [products]
  );
  const totalUnits = useMemo(
    () => products.reduce((acc, p) => acc + Number(p.stock_total || 0), 0),
    [products]
  );

  if (loading) return <p className="text-gray-600">Cargando dashboard...</p>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500 text-sm">Resumen rápido de tu negocio</p>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-100 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-lg border p-3">
          <p className="text-xs text-gray-500">Productos</p>
          <p className="text-2xl font-semibold">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg border p-3">
          <p className="text-xs text-gray-500">Clientes</p>
          <p className="text-2xl font-semibold">{totalCustomers}</p>
        </div>
        <div className="bg-white rounded-lg border p-3">
          <p className="text-xs text-gray-500">Unidades en stock</p>
          <p className="text-2xl font-semibold">{totalUnits}</p>
        </div>
        <div className="bg-white rounded-lg border p-3">
          <p className="text-xs text-gray-500">Stock bajo</p>
          <p className="text-2xl font-semibold">{lowStock}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Ventas de hoy</h3>
          <p className="text-3xl font-bold text-green-700">s/ 0.00</p>
          <p className="text-xs text-gray-500 mt-1">Dato ilustrativo</p>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Ingresos del mes</h3>
          <p className="text-3xl font-bold text-gray-800">s/ 0.00</p>
          <p className="text-xs text-gray-500 mt-1">Dato ilustrativo</p>
        </div>

        <div className="bg-white rounded-lg border p-4 md:col-span-2">
          <h3 className="font-semibold text-gray-800 mb-3">Productos con stock bajo</h3>
          {lowStock === 0 ? (
            <p className="text-gray-500 text-sm">Todo en orden ✅</p>
          ) : (
            <ul className="text-sm list-disc pl-5 text-gray-700">
              {products
                .filter((p) => Number(p.stock_total || 0) <= 5)
                .slice(0, 5)
                .map((p) => (
                  <li key={p.id}>
                    {p.name} — stock {Number(p.stock_total || 0)}
                  </li>
                ))}
              {lowStock > 5 && (
                <li className="text-gray-500">y {lowStock - 5} más…</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
