import { Router } from "express";
import {
    getEspecialidades,
    getEspecialidad,
    createEspecialidad,
    deleteEspecialidad,
    updateEspecialidad,
} from "../controllers/especialidades.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "API de Especialidades" });
});

router.get("/especialidades", getEspecialidades);
router.get("/especialidades/:id", getEspecialidad);
router.post("/especialidades", createEspecialidad);
router.put("/especialidades/:id", updateEspecialidad);
router.delete("/especialidades/:id", deleteEspecialidad);

export default router;
