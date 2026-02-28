CREATE DATABASE modulo7;

USE modulo7;
-- Crear la tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Insertar algunos datos de ejemplo
INSERT INTO usuarios (nombre, email) VALUES
('Ana García', 'ana.garcia@example.com'),
('Luis Fernández', 'luis.fernandez@example.com'),
('Sofía Martínez', 'sofia.martinez@example.com');

-- Verificar que los datos se insertaron correctamente
SELECT COUNT(*) as total_usuarios FROM usuarios

