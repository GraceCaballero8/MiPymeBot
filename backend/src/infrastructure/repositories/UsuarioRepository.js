import pool from "../config/db.js";

class UsuarioRepository {
  static async findByEmail(email) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1 LIMIT 1",
      [email]
    );
    return result.rows[0];
  }

  // FALTA EL TEMA DE LOS ROLES
  static async create({ dni, nombres, apellidos, email, contrasena, rol_id}) {
    const result = await pool.query(
        `INSERT INTO usuarios (dni, nombres, apellidos, email, contrasena, rol_id, fecha_creacion, estado_registro)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), 1)
        RETURNING *`,
        [dni, nombres, apellidos, email, contrasena, rol_id]
    );
    return result.rows[0];
  }

}

export default UsuarioRepository;
