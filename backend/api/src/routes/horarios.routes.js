import { Router } from "express";
import {
    getHorarios,
    getHorario,
    createHorario,
    deleteHorario,
    updateHorario,
} from "../controllers/horarios.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "API de Horarios" });
});

router.get("/horarios", getHorarios);
router.get("/horarios/:id", getHorario);
router.post("/horarios", createHorario);
router.put("/horarios/:id", updateHorario);
router.delete("/horarios/:id", deleteHorario);

export default router;
