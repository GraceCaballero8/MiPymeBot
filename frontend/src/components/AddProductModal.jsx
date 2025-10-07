import { useState } from "react";
import api from "../services/api";

export default function AddProductModal({ onClose, onSaved }) {
  const [form, setForm] = useState({
    nombre: "",
    categoria_id: 1,
    stock_minimo: 5,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.nombre) return alert("Nombre requerido");
    await api.post("/products", form);
    onSaved(); // actualiza la lista
    onClose(); // cierra modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Añadir Producto</h2>

        <input
          name="nombre"
          placeholder="Nombre"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={form.nombre}
          onChange={handleChange}
        />

        <select
          name="categoria_id"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={form.categoria_id}
          onChange={handleChange}
        >
          <option value={1}>Ropa</option>
          <option value={2}>Zapatos</option>
          <option value={3}>Accesorios</option>
        </select>

        <input
          name="stock_minimo"
          type="number"
          placeholder="Stock mínimo"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={form.stock_minimo}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}