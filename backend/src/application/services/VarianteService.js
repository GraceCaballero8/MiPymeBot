import VarianteRepository from "../../infrastructure/repositories/VarianteRepository.js";

class VarianteService {
  static async listarPorProducto(productoId) {
    return await VarianteRepository.getByProducto(productoId);
  }

  static async obtenerPorId(id) {
    const v = await VarianteRepository.getById(id);
    if (!v) throw new Error("Variante no encontrada");
    return v;
  }

  static async crear(data) {
    if (!data.talla || !data.color || data.stock_actual == null || !data.sku) {
      throw new Error("Faltan datos obligatorios");
    }
    if (await VarianteRepository.skuExists(data.sku)) {
      throw new Error("SKU duplicado");
    }
    return await VarianteRepository.create(data);
  }

  static async actualizar(id, data) {
    if (await VarianteRepository.skuExists(data.sku, id)) {
      throw new Error("SKU duplicado");
    }
    const updated = await VarianteRepository.update(id, data);
    if (!updated) throw new Error("Variante no encontrada");
    return updated;
  }

  static async eliminar(id) {
    await VarianteRepository.delete(id);
    return { message: "Variante eliminada" };
  }
}

export default VarianteService;