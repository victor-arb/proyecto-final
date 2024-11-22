import { pool } from "../db.js";

export const getCitas = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM citas");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener citas:", error);
        res.status(500).json({ message: "Error al obtener citas" });
    }
};

export const getCita = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM citas WHERE id_cita = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener cita:", error);
        res.status(500).json({ message: "Error al obtener cita" });
    }
};

export const createCita = async (req, res) => {
    const { usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO citas (usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear cita:", error);
        res.status(500).json({ message: "Error al crear cita" });
    }
};

export const updateCita = async (req, res) => {
    const { id } = req.params;
    const { usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total } = req.body;

    try {
        const result = await pool.query(
            `UPDATE citas 
            SET usuario_id = $1, medico_id = $2, fecha_cita = $3, hora_cita = $4, estado_cita = $5, costo_total = $6 
            WHERE id_cita = $7 
            RETURNING *`,
            [usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar cita:", error);
        res.status(500).json({ message: "Error al actualizar cita" });
    }
};

export const deleteCita = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM citas WHERE id_cita = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        res.json({ message: "Cita eliminada", cita: result.rows[0] });
    } catch (error) {
        console.error("Error al eliminar cita:", error);
        res.status(500).json({ message: "Error al eliminar cita" });
    }
};
