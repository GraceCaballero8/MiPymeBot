import pool from "../config/db.js";

class VarianteRepository {
  static async getByProducto(productoId) {
    const result = await pool.query(
      `SELECT id, talla, color, stock_actual, sku
       FROM producto_variantes
       WHERE producto_id = $1
       ORDER BY talla, color`,
      [productoId]
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      "SELECT * FROM producto_variantes WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  static async create({ producto_id, talla, color, stock_actual, sku }) {
    const result = await pool.query(
      `INSERT INTO producto_variantes (producto_id, talla, color, stock_actual, sku)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [producto_id, talla, color, stock_actual, sku]
    );
    return result.rows[0];
  }

  static async update(id, { talla, color, stock_actual, sku }) {
    const result = await pool.query(
      `UPDATE producto_variantes
       SET talla = $1, color = $2, stock_actual = $3, sku = $4
       WHERE id = $5
       RETURNING *`,
      [talla, color, stock_actual, sku, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query("DELETE FROM producto_variantes WHERE id = $1", [id]);
  }

  static async skuExists(sku, excludeId = 0) {
    const result = await pool.query(
      "SELECT 1 FROM producto_variantes WHERE sku = $1 AND id <> $2 LIMIT 1",
      [sku, excludeId]
    );
    return result.rowCount > 0;
  }
}

export default VarianteRepository;