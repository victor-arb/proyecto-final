import { pool } from "../db.js";

export const getCitasServicios = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM citas_servicios");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener citas y servicios:", error);
        res.status(500).json({ message: "Error al obtener citas y servicios" });
    }
};

export const getCitaServicio = async (req, res) => {
    const { cita_id, servicio_id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM citas_servicios WHERE cita_id = $1 AND servicio_id = $2",
            [cita_id, servicio_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Relación entre cita y servicio no encontrada" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener relación entre cita y servicio:", error);
        res.status(500).json({ message: "Error al obtener relación entre cita y servicio" });
    }
};

export const createCitaServicio = async (req, res) => {
    const { cita_id, servicio_id } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO citas_servicios (cita_id, servicio_id) 
            VALUES ($1, $2) RETURNING *`,
            [cita_id, servicio_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear relación entre cita y servicio:", error);
        res.status(500).json({ message: "Error al crear relación entre cita y servicio" });
    }
};

export const deleteCitaServicio = async (req, res) => {
    const { cita_id, servicio_id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM citas_servicios WHERE cita_id = $1 AND servicio_id = $2 RETURNING *",
            [cita_id, servicio_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Relación entre cita y servicio no encontrada" });
        }
        res.json({ message: "Relación entre cita y servicio eliminada", data: result.rows[0] });
    } catch (error) {
        console.error("Error al eliminar relación entre cita y servicio:", error);
        res.status(500).json({ message: "Error al eliminar relación entre cita y servicio" });
    }
};
