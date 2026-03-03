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

// consulta parametrizada
async function obtenerUsuarioPorEmail(email) {
  try {
    const consulta = 'SELECT * FROM usuarios WHERE email = $1';
    const valores = [email];

    const resultado = await pool.query(consulta, valores);

    console.log(`Resultado para ${email}:`, resultado.rows);
  } catch (error) {
    console.error('❌ Error al buscar usuario por email:', error.message);
  }
}

// Pruebas
obtenerUsuarioPorEmail('test@correo.com');      // email que SÍ exista en tu DB
obtenerUsuarioPorEmail('noexiste@correo.com');  // email que NO exista


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}/usuarios`)
);