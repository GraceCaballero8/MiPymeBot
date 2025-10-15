import ProveedorRepository from "../../infrastructure/repositories/ProveedorRepository.js";

class ProveedorService {
  static async listar() {
    return await ProveedorRepository.getAll();
  }

  static async obtenerPorId(id) {
    const prov = await ProveedorRepository.getById(id);
    if (!prov) throw new Error("Proveedor no encontrado");
    return prov;
  }

  static async crear(data) {
    if (!data.nombre) throw new Error("El nombre es obligatorio");
    return await ProveedorRepository.create(data);
  }

  static async actualizar(id, data) {
    const updated = await ProveedorRepository.update(id, data);
    if (!updated) throw new Error("Proveedor no encontrado");
    return updated;
  }

  static async eliminar(id) {
    await ProveedorRepository.delete(id);
    return { message: "Proveedor eliminado" };
  }
}

export default ProveedorService;
