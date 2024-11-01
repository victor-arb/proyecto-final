import { Router } from "express";
import { ServicioAdicionalController } from "../controllers/ServicioAdicionalController.mjs";

class ServicioAdicionalRoutes {
  constructor() {
    this.router = Router();
    this.controller = new ServicioAdicionalController();
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.createServicioAdicional);
    this.router
      .route("/:id")
      .put(this.controller.updateServicioAdicional)
      .delete(this.controller.deleteServicioAdicional);
  }
}

export { ServicioAdicionalRoutes };
