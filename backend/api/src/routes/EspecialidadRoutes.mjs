import { Router } from "express";
import { EspecialidadController } from "../controllers/EspecialidadController.mjs";

class EspecialidadRoutes {
  constructor() {
    this.router = Router();
    this.controller = new EspecialidadController();
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.createEspecialidad);
    this.router
      .route("/:id")
      .put(this.controller.updateEspecialidad)
      .delete(this.controller.deleteEspecialidad);
  }
}

export { EspecialidadRoutes };
