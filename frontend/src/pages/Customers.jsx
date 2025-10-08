import { useEffect, useState } from "react";
import api from "../services/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const loadCustomers = (query = "") => {
    setLoading(true);
    setError("");
    const params = {};
    if (query) params.search = query;
    api
      .get("/customers", { params })
      .then((res) => {
        setCustomers(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar la lista de clientes");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  if (loading) return <p className="text-gray-600">Cargando clientes...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          className="flex-1 px-3 py-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && loadCustomers(search)}
        />
        <button
          onClick={() => loadCustomers(search)}
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
          <p className="text-xs text-gray-500">Total de clientes</p>
          <p className="text-xl font-semibold">{customers.length}</p>
        </div>
      </div>

      {customers.length === 0 ? (
        <p className="text-gray-500">No hay clientes.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left font-medium px-4 py-2">Cliente</th>
                <th className="text-left font-medium px-4 py-2">Email</th>
                <th className="text-left font-medium px-4 py-2">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-2 text-gray-800">{c.name || c.full_name || "-"}</td>
                  <td className="px-4 py-2 text-gray-600">{c.email || "-"}</td>
                  <td className="px-4 py-2 text-gray-600">{c.phone || c.telefono || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
