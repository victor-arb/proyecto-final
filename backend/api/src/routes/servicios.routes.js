import { Router } from "express";
import {
    getServicios,
    getServicio,
    createServicio,
    deleteServicio,
    updateServicio,
} from "../controllers/servicios.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "API de Servicios Adicionales" });
});

router.get("/servicios", getServicios);
router.get("/servicios/:id", getServicio);
router.post("/servicios", createServicio);
router.put("/servicios/:id", updateServicio);
router.delete("/servicios/:id", deleteServicio);

export default router;
