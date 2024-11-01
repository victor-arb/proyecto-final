import { CourseService } from "../services/CourseService.mjs";

class CourseController {
  #service;
  constructor() {
    this.#service = new CourseService();
  }

  getAll = async (req, res) => {
    const list = await this.#service.getAll();
    res.send(list);
  };

  createCourse = async (req, res) => {
    const { code, name, credits } = req.body;
    if (!code || !name || !credits) {
      return res.status(401).send("datos inválidos");
    }
    const created = await this.#service.createCourse(code, name, credits);
    console.log(created, "created");
    if (created == null) res.status(500).send("error");
    else res.status(201).send(created);
  };

  updateCourse = async (req, res) => {
    const { code } = req.params;
    const { name, credits } = req.body;
    if (!name || !credits) {
      return res.status(401).send("datos inválidos");
    }
    const updated = await this.#service.updateCourse(code, name, credits);
    res.status(200).send(updated);
  };

  deleteCourse = async (req, res) => {
    const { code } = req.params;
    if (!code) {
      return res.status(401).send("datos inválidos");
    }
    const deleted = await this.#service.deleteCourse(code);
    res.status(201).send(deleted);
  };
}

export { CourseController };
