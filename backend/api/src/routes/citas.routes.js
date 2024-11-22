import { Router } from "express";
import {
    getCitas,
    getCita,
    createCita,
    deleteCita,
    updateCita,
} from "../controllers/citas.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "API de Citas" });
});

router.get("/citas", getCitas);
router.get("/citas/:id", getCita);
router.post("/citas", createCita);
router.put("/citas/:id", updateCita);
router.delete("/citas/:id", deleteCita);

export default router;
