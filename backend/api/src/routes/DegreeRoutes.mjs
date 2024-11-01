// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { DegreeController } from "../controllers/DegreeController.mjs";

class DegreeRoutes {
  constructor() {
    this.router = Router();
    this.controller = new DegreeController();
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.createDegree);
    this.router
      .route("/:id")
      .put(this.controller.updateDegree)
      .delete(this.controller.deleteDegree);
  }
}
export { DegreeRoutes };
