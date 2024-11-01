import { Router } from "express";
import { HorarioController } from "../controllers/HorarioController.mjs";

class HorarioRoutes {
  constructor() {
    this.router = Router();
    this.controller = new HorarioController();
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.createHorario);
    this.router
      .route("/:id")
      .put(this.controller.updateHorario)
      .delete(this.controller.deleteHorario);
  }
}

export { HorarioRoutes };
