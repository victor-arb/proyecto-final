// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { StudentController } from "../controllers/StudentController.mjs";

class StudentRoutes {
  constructor() {
    this.router = Router();
    this.controller = new StudentController();
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.createStudent);
    this.router
      .route("/:dni")
      .put(this.controller.updateStudent)
      .delete(this.controller.deleteStudent);
    this.router
      .route("/:dni/courses")
      .get(this.controller.listCourses)
      .post(this.controller.enrollCourse);
    this.router
      .route("/:dni/courses/:id")
      .get(this.controller.getCourse)
      .delete(this.controller.cancelCourse);
  }
}
export { StudentRoutes };
