// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { FacultyController } from "../controllers/FacultyController.mjs";

class FacultyRoutes {
  constructor() {
    this.router = Router();
    this.controller = new FacultyController();
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.createFaculty);
    this.router.put("/:id", this.controller.updateFaculty);
    this.router.delete("/:id", this.controller.deleteFaculty);
  }
}
export { FacultyRoutes };
