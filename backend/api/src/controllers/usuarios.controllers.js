import { pool } from "../db.js";

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuarios");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

// Obtener un usuario por ID
export const getUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ message: "Error al obtener usuario" });
    }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
    const { nombre, apellido, correo, password, cedula, celular, ubicacion, rol_usuario, fecha_nacimiento } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO usuarios 
            (nombre, apellido, correo, password, cedula, celular, ubicacion, rol_usuario, fecha_nacimiento) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *`,
            [nombre, apellido, correo, password, cedula, celular, ubicacion, rol_usuario, fecha_nacimiento]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear usuario:", error);

        if (error.code === "23505") {
            return res.status(409).json({ message: "El usuario ya existe" });
        }
        res.status(500).json({ message: "Error al crear usuario" });
    }
};

// Actualizar un usuario existente
export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, password, celular, ubicacion, rol_usuario } = req.body;

    try {
        const result = await pool.query(
            `UPDATE usuarios 
            SET nombre = $1, apellido = $2, correo = $3, password = $4, celular = $5, ubicacion = $6, rol_usuario = $7
            WHERE id_usuario = $8 
            RETURNING *`,
            [nombre, apellido, correo, password, celular, ubicacion, rol_usuario, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error al actualizar usuario" });
    }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado", usuario: result.rows[0] });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};
