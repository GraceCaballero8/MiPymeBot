import ProductoRepository from "../../infrastructure/repositories/ProductoRepository.js";

class ProductoService {
  static async listar() {
    return await ProductoRepository.getAll();
  }

  static async obtenerPorId(id) {
    const producto = await ProductoRepository.getById(id);
    if (!producto) throw new Error("Producto no encontrado");
    return producto;
  }

  static async crear(data) {
    if (!data.nombre || !data.categoria_id) {
      throw new Error("Faltan datos obligatorios");
    }
    return await ProductoRepository.create(data);
  }

  static async actualizar(id, data) {
    const updated = await ProductoRepository.update(id, data);
    if (!updated) throw new Error("Producto no encontrado");
    return updated;
  }

  static async eliminar(id) {
    await ProductoRepository.delete(id);
    return { message: "Producto eliminado" };
  }
}

export default ProductoService;