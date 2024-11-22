import { Router } from "express";
import {
    getMedicos,
    getMedico,
    createMedico,
    deleteMedico,
    updateMedico,
} from "../controllers/medicos.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "API de Médicos" });
});

router.get("/medicos", getMedicos);
router.get("/medicos/:id", getMedico);
router.post("/medicos", createMedico);
router.put("/medicos/:id", updateMedico);
router.delete("/medicos/:id", deleteMedico);

export default router;
