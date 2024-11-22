import { pool } from "../db.js";

export const getHorarios = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM horarios");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener horarios:", error);
        res.status(500).json({ message: "Error al obtener horarios" });
    }
};

export const getHorario = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM horarios WHERE id_horario = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Horario no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener horario:", error);
        res.status(500).json({ message: "Error al obtener horario" });
    }
};

export const createHorario = async (req, res) => {
    const { medico_id, hora_inicio, hora_fin, dia_semana } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO horarios (medico_id, hora_inicio, hora_fin, dia_semana) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [medico_id, hora_inicio, hora_fin, dia_semana]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear horario:", error);
        res.status(500).json({ message: "Error al crear horario" });
    }
};

export const updateHorario = async (req, res) => {
    const { id } = req.params;
    const { medico_id, hora_inicio, hora_fin, dia_semana } = req.body;

    try {
        const result = await pool.query(
            `UPDATE horarios 
            SET medico_id = $1, hora_inicio = $2, hora_fin = $3, dia_semana = $4 
            WHERE id_horario = $5 
            RETURNING *`,
            [medico_id, hora_inicio, hora_fin, dia_semana, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Horario no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar horario:", error);
        res.status(500).json({ message: "Error al actualizar horario" });
    }
};

export const deleteHorario = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM horarios WHERE id_horario = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Horario no encontrado" });
        }
        res.json({ message: "Horario eliminado", horario: result.rows[0] });
    } catch (error) {
        console.error("Error al eliminar horario:", error);
        res.status(500).json({ message: "Error al eliminar horario" });
    }
};
