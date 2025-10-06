import pool from "../config/db.js";

class CategoriaRepository {
  static async getAll() {
    const result = await pool.query("SELECT * FROM categorias ORDER BY id");
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query("SELECT * FROM categorias WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create({ nombre }) {
    const result = await pool.query(
      "INSERT INTO categorias (nombre) VALUES ($1) RETURNING *",
      [nombre]
    );
    return result.rows[0];
  }

  static async update(id, { nombre }) {
    const result = await pool.query(
      "UPDATE categorias SET nombre = $1 WHERE id = $2 RETURNING *",
      [nombre, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query("DELETE FROM categorias WHERE id = $1", [id]);
  }
}

export default CategoriaRepository;