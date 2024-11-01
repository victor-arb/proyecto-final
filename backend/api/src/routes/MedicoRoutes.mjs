import { Router } from "express";
import { MedicoController } from "../controllers/MedicoController.mjs";

class MedicoRoutes {
  constructor() {
    this.router = Router();
    this.controller = new MedicoController();
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.createMedico);
    this.router
      .route("/:id")
      .put(this.controller.updateMedico)
      .delete(this.controller.deleteMedico);
  }
}

export { MedicoRoutes };
