// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { ProfessorController } from "../controllers/ProfessorController.mjs";

class ProfessorRoutes {
  constructor() {
    this.router = Router();
    this.controller = new ProfessorController();
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.createProfessor);
    this.router
      .route("/:id")
      .put(this.controller.updateProfessor)
      .delete(this.controller.deleteProfessor);
  }
}
export { ProfessorRoutes };
