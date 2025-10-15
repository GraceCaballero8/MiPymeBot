
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",       // <-- cambia con tu usuario
  host: "localhost",      // <-- o 127.0.0.1
  database: "mipymebot",   // <-- cambia por tu BD
  password: "12345678",     // <--  clave real
  port: 5432,
});

export default pool;

