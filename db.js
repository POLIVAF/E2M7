require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function verificarConexion() {
  let client;
  try {
    client = await pool.connect();
    console.log("✅ Conexión exitosa a PostgreSQL");
  } catch (err) {
    console.error("❌ Error al conectar a PostgreSQL:", err.message);
  } finally {
    if (client) client.release();
  }
}

async function query(text, params = []) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error("❌ Error ejecutando query:", err.message);
    console.error("SQL:", text);  // Agrega esta línea para mostrar la consulta SQL
    console.error("Params:", params); // Agrega esta línea para mostrar los parámetros
    console.error("Mensaje:", err.message); // Agrega esta línea para mostrar el mensaje de error
    throw err;
  }
}

// Ejecuta la verificación al iniciar
verificarConexion();

module.exports = { query, pool };