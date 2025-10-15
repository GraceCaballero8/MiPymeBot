import pool from "../config/db.js";

class ProveedorRepository {
  static async getAll() {
    const result = await pool.query("SELECT * FROM proveedores ORDER BY id");
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query("SELECT * FROM proveedores WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create({ nombre, contacto, telefono, email, direccion }) {
    const result = await pool.query(
      `INSERT INTO proveedores (nombre, contacto, telefono, email, direccion)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, contacto, telefono, email, direccion]
    );
    return result.rows[0];
  }

  static async update(id, { nombre, contacto, telefono, email, direccion }) {
    const result = await pool.query(
      `UPDATE proveedores
       SET nombre = $1, contacto = $2, telefono = $3, email = $4, direccion = $5
       WHERE id = $6 RETURNING *`,
      [nombre, contacto, telefono, email, direccion, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query("DELETE FROM proveedores WHERE id = $1", [id]);
  }
}

export default ProveedorRepository;