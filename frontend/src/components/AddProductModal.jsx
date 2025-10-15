import { useState } from "react";
import api from "../services/api";

export default function AddProductModal({ onClose, onSaved }) {
  const [form, setForm] = useState({
    nombre: "",
    categoria_id: 1,
    stock_minimo: 5,
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleSave = async () => {
    if (!form.nombre) return alert("Nombre requerido");

    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("categoria_id", form.categoria_id);
    formData.append("stock_minimo", form.stock_minimo);
    if (file) formData.append("imagen", file); // ➜ tu foto

    try {
      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSaved(); // recarga lista
      onClose(); // cierra modal
    } catch (err) {
      alert("Error al guardar");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Añadir Producto</h2>

        {/* Nombre */}
        <input
          name="nombre"
          placeholder="Nombre"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={form.nombre}
          onChange={handleChange}
        />

        {/* Categoría */}
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

        {/* Stock mínimo */}
        <input
          name="stock_minimo"
          type="number"
          placeholder="Stock mínimo"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={form.stock_minimo}
          onChange={handleChange}
        />

        {/* Selector de imagen */}
        <label className="block mb-4">
          <span className="text-gray-700">Imagen del producto</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded file:border-0
                      file:text-sm file:bg-green-600 file:text-white
                      hover:file:bg-green-700"
          />
        </label>

        {/* Botones */}
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