const express = require('express');
require('dotenv').config(); 
const { pool, query } = require('./db');  // 👈 solo UNA importación

const app = express();
app.use(express.json());

// 👇 Función pedida por la guía (script de consola)
async function obtenerUsuarios() {
  try {
    const resultado = await pool.query('SELECT * FROM usuarios');
    console.log('Usuarios (console):', resultado.rows);
  } catch (error) {
    console.error('Error al obtener usuarios (console):', error.message);
  }
}

// Llamada a la función (se ejecuta al iniciar el server)
obtenerUsuarios();

// 👇 Endpoint HTTP (para Postman / navegador)
app.get('/usuarios', async (req, res) => {
  try {
    const result = await query('SELECT * FROM usuarios ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error real:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}/usuarios`)
);