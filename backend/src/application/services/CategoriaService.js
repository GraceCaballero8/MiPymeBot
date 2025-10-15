import CategoriaRepository from "../../infrastructure/repositories/CategoriaRepository.js";

class CategoriaService {
  static async listar() {
    return await CategoriaRepository.getAll();
  }

  static async obtenerPorId(id) {
    const cat = await CategoriaRepository.getById(id);
    if (!cat) throw new Error("Categoría no encontrada");
    return cat;
  }

  static async crear(data) {
    if (!data.nombre) throw new Error("El nombre es obligatorio");
    return await CategoriaRepository.create(data);
  }

  static async actualizar(id, data) {
    const updated = await CategoriaRepository.update(id, data);
    if (!updated) throw new Error("Categoría no encontrada");
    return updated;
  }

  static async eliminar(id) {
    await CategoriaRepository.delete(id);
    return { message: "Categoría eliminada" };
  }
}

export default CategoriaService;