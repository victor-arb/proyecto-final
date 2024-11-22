import { pool } from "../db.js";

export const getMedicos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM medicos");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener médicos:", error);
        res.status(500).json({ message: "Error al obtener médicos" });
    }
};

export const getMedico = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM medicos WHERE id_medico = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Médico no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener médico:", error);
        res.status(500).json({ message: "Error al obtener médico" });
    }
};

export const createMedico = async (req, res) => {
    const { nombre, apellido, cedula, correo, celular, ubicacion_consultorio } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO medicos 
            (nombre, apellido, cedula, correo, celular, ubicacion_consultorio) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`,
            [nombre, apellido, cedula, correo, celular, ubicacion_consultorio]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear médico:", error);

        if (error.code === "23505") {
            return res.status(409).json({ message: "El médico ya existe" });
        }
        res.status(500).json({ message: "Error al crear médico" });
    }
};

export const updateMedico = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, celular, ubicacion_consultorio } = req.body;

    try {
        const result = await pool.query(
            `UPDATE medicos 
            SET nombre = $1, apellido = $2, correo = $3, celular = $4, ubicacion_consultorio = $5
            WHERE id_medico = $6 
            RETURNING *`,
            [nombre, apellido, correo, celular, ubicacion_consultorio, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Médico no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar médico:", error);
        res.status(500).json({ message: "Error al actualizar médico" });
    }
};

export const deleteMedico = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM medicos WHERE id_medico = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Médico no encontrado" });
        }
        res.json({ message: "Médico eliminado", medico: result.rows[0] });
    } catch (error) {
        console.error("Error al eliminar médico:", error);
        res.status(500).json({ message: "Error al eliminar médico" });
    }
};
