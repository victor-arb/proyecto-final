// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { CourseController } from "../controllers/CourseController.mjs";

class CourseRoutes {
  constructor() {
    this.router = Router();
    this.controller = new CourseController();
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.createCourse);
    this.router
      .route("/:id")
      .put(this.controller.updateCourse)
      .delete(this.controller.deleteCourse);
  }
}
export { CourseRoutes };
