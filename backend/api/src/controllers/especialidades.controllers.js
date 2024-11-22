import { pool } from "../db.js";

export const getEspecialidades = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM especialidades");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener especialidades:", error);
        res.status(500).json({ message: "Error al obtener especialidades" });
    }
};

export const getEspecialidad = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM especialidades WHERE id_especialidad = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Especialidad no encontrada" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener especialidad:", error);
        res.status(500).json({ message: "Error al obtener especialidad" });
    }
};

export const createEspecialidad = async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO especialidades (nombre, descripcion) 
            VALUES ($1, $2) RETURNING *`,
            [nombre, descripcion]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear especialidad:", error);

        if (error.code === "23505") {
            return res.status(409).json({ message: "La especialidad ya existe" });
        }
        res.status(500).json({ message: "Error al crear especialidad" });
    }
};

export const updateEspecialidad = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const result = await pool.query(
            `UPDATE especialidades 
            SET nombre = $1, descripcion = $2 
            WHERE id_especialidad = $3 
            RETURNING *`,
            [nombre, descripcion, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Especialidad no encontrada" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar especialidad:", error);
        res.status(500).json({ message: "Error al actualizar especialidad" });
    }
};

export const deleteEspecialidad = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM especialidades WHERE id_especialidad = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Especialidad no encontrada" });
        }
        res.json({ message: "Especialidad eliminada", especialidad: result.rows[0] });
    } catch (error) {
        console.error("Error al eliminar especialidad:", error);
        res.status(500).json({ message: "Error al eliminar especialidad" });
    }
};
