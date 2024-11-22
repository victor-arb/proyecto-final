import { pool } from "../db.js";

export const getServicios = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM servicios_adicionales");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener servicios adicionales:", error);
        res.status(500).json({ message: "Error al obtener servicios adicionales" });
    }
};

export const getServicio = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM servicios_adicionales WHERE id_servicio = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Servicio adicional no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener servicio adicional:", error);
        res.status(500).json({ message: "Error al obtener servicio adicional" });
    }
};

export const createServicio = async (req, res) => {
    const { nombre_servicio, descripcion, costo_servicio } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO servicios_adicionales (nombre_servicio, descripcion, costo_servicio) 
            VALUES ($1, $2, $3) RETURNING *`,
            [nombre_servicio, descripcion, costo_servicio]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear servicio adicional:", error);
        res.status(500).json({ message: "Error al crear servicio adicional" });
    }
};

export const updateServicio = async (req, res) => {
    const { id } = req.params;
    const { nombre_servicio, descripcion, costo_servicio } = req.body;

    try {
        const result = await pool.query(
            `UPDATE servicios_adicionales 
            SET nombre_servicio = $1, descripcion = $2, costo_servicio = $3 
            WHERE id_servicio = $4 
            RETURNING *`,
            [nombre_servicio, descripcion, costo_servicio, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Servicio adicional no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar servicio adicional:", error);
        res.status(500).json({ message: "Error al actualizar servicio adicional" });
    }
};

export const deleteServicio = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM servicios_adicionales WHERE id_servicio = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Servicio adicional no encontrado" });
        }
        res.json({ message: "Servicio adicional eliminado", servicio: result.rows[0] });
    } catch (error) {
        console.error("Error al eliminar servicio adicional:", error);
        res.status(500).json({ message: "Error al eliminar servicio adicional" });
    }
};
