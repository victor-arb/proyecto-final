import { Router } from "express";
import {
    getCitasServicios,
    getCitaServicio,
    createCitaServicio,
    deleteCitaServicio,
} from "../controllers/citas_servicios.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "API de Citas y Servicios" });
});

router.get("/citas_servicios", getCitasServicios);
router.get("/citas_servicios/:cita_id/:servicio_id", getCitaServicio);
router.post("/citas_servicios", createCitaServicio);
router.delete("/citas_servicios/:cita_id/:servicio_id", deleteCitaServicio);

export default router;
