# 🛠️ E2-M7 Ejercicio
Lectura de Datos y Consultas Seguras 🛡️

## 🔐 Variables de entorno

Crea un archivo .env en la raíz:
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_base
PORT=3000

## ▶️ Rutas de consola (comandos)
# Iniciar el servidor
npm start

# o si usas nodemon
npm run dev

## Salida esperada en consola:

✅ Conexión exitosa a PostgreSQL
Servidor corriendo en http://localhost:3000/usuarios
Usuarios (console): [ ... ]
Resultado para test@correo.com: [ { ... } ]
Resultado para noexiste@correo.com: []

## 🌐 Endpoints HTTP

# http://localhost:3000/usuarios
# http://localhost:3000/usuarios/buscar?email=test@correo.com

## si existe
[
  {
    "id": 1,
    "nombre": "Test",
    "email": "test@correo.com"
  }
]

## si no existe
[]

## 🛡️ Seguridad: Inyección SQL

Este proyecto NO concatena strings para construir SQL.
Todas las consultas que reciben datos del usuario usan consultas parametrizadas:

const consulta = 'SELECT * FROM usuarios WHERE email = $1';
const valores = [email];
const resultado = await pool.query(consulta, valores);

## 🗂️ Estructura del proyecto

.
├── app.js
├── db.js
├── .env
├── package.json
└── README.md


## 🧪 Pruebas

Desde consola:
Al iniciar el server se ejecutan pruebas de búsqueda por email (uno existente y uno no existente).

Desde navegador o Postman:

GET /usuarios

GET /usuarios/buscar?email=...

## 🧠 Conceptos aplicados

pool.query(consulta, valores)

SELECT

result.rows

Inyección SQL (riesgo y prevención)

Consultas parametrizadas con $1, $2, ...