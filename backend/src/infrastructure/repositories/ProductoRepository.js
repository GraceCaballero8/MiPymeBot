import pool from "../config/db.js";

class ProductoRepository {
  static async getAll(search = "", category = "", stock = "") {
    const sql = `
      SELECT p.id,
            p.nombre,
            c.nombre AS categoria,
            COALESCE(SUM(pv.stock_actual), 0) AS stock_total,
            ( SELECT precio_unitario
              FROM precios_por_cantidad
              WHERE producto_id = p.id AND cantidad_minima = 1
              LIMIT 1
            ) AS precio_menor
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN producto_variantes pv ON pv.producto_id = p.id
      WHERE LOWER(p.nombre) LIKE LOWER($1)
        AND ($2::int IS NULL OR p.categoria_id = $2)
      GROUP BY p.id, p.nombre, c.nombre
      HAVING (
              ($3 = 'low'  AND COALESCE(SUM(pv.stock_actual), 0) <= 5) OR
              ($3 = 'out' AND COALESCE(SUM(pv.stock_actual), 0) = 0)  OR
              ($3 = ''    OR $3 IS NULL)
            )
      ORDER BY p.id DESC
    `;
    const result = await pool.query(sql, [
      `%${search}%`,
      category || null,
      stock || null,
    ]);
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.nombre,
        p.categoria_id,
        c.nombre AS categoria,
        COALESCE(SUM(pv.stock_actual), 0) AS stock_total
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      LEFT JOIN producto_variantes pv ON pv.producto_id = p.id
      WHERE p.id = $1
      GROUP BY p.id, p.nombre, p.categoria_id, c.nombre
    `, [id]);
    return result.rows[0];
  }

  static async create({ nombre, categoria_id, stock_minimo = 5 }) {
    const result = await pool.query(`
      INSERT INTO productos (nombre, categoria_id, stock_actual, stock_minimo)
      VALUES ($1, $2, 0, $3)
      RETURNING *
    `, [nombre, categoria_id, stock_minimo]);
    return result.rows[0];
  }

  static async update(id, { nombre, categoria_id, stock_minimo }) {
    const result = await pool.query(`
      UPDATE productos
      SET nombre = $1, categoria_id = $2, stock_minimo = $3
      WHERE id = $4
      RETURNING *
    `, [nombre, categoria_id, stock_minimo, id]);
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query("DELETE FROM productos WHERE id = $1", [id]);
  }
}

export default ProductoRepository;