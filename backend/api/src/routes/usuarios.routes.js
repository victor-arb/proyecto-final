import { Router } from "express";
import {
    getUsuarios,
    getUsuario,
    createUsuario,
    deleteUsuario,
    updateUsuario,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "API de Usuarios" });
});

router.get("/users", getUsuarios);
router.get("/users/:id", getUsuario);
router.post("/users", createUsuario);
router.put("/users/:id", updateUsuario);
router.delete("/users/:id", deleteUsuario);

export default router;
