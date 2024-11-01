// Manipulo el request/response

import { CourseService } from "../services/CourseService.mjs";
import { StudentService } from "../services/StudentService.mjs";

// llamo a los servicios
class StudentController {
  #service;
  #courseService;
  constructor() {
    this.#service = new StudentService();
    this.#courseService = new CourseService();
  }
  getAll = async (req, res) => {
    const lista = await this.#service.getAll();
    res.send(lista);
  };

  createStudent = async (req, res) => {
    const { dni, names, surname, dateOfBith } = req.body;
    if (!dni || !names || !surname) {
      return res.status(401).send("datos inválidos");
    }
    const newStudent = await this.#service.createStudent(
      dni,
      names,
      surname,
      dateOfBith ?? null
    );
    console.log(newStudent, "newStudent");
    res.set("Location", `${req.Referer}/${cedula}`);
    if (nueva == null) res.status(500).send("error");
    else res.status(201).send(newStudent);
  };

  updateStudent = async (req, res) => {
    const { dni } = req.params;
    const { names, surname, dateOfBith } = req.body;
    if (!dni || (!names && !surname && !dateOfBith)) {
      return res.status(401).send("datos inválidos");
    }
    const updated = await this.#service.updateStudent(
      dni,
      names,
      surname,
      dateOfBith
    );
    res.status(200).send(updated);
  };

  deleteStudent = async (req, res) => {
    const { dni } = req.params;
    if (!dni) {
      return res.status(401).send("datos inválidos");
    }
    const deleted = await this.#service.deleteStudent(dni);
    res.status(201).send(deleted);
  };

  listCourses = async (req, res) => {
    const { dni } = req.params;
    if (!dni) {
      return res.status(401).send("datos inválidos");
    }
    res.status(200).send(await this.#service.getCourses(dni));
  };

  enrollCourse = async(req, res) => {
    const { dni } = req.params;
    const { code, semester } = req.body;
    if (!dni || !code || !semester) {
      return res.status(401).send("datos inválidos");
    }
    const enrolled = await this.#service.enrollCourse(dni, code, semester);
    if (!enrolled) {
      return res.status(500).send("No se pudo guardar la información");
    }
    const created = await this.#courseService.getOne(code);
    res.status(200).send(created);
  };

  getCourse = (req, res) => {};

  cancelCourse = (req, res) => {};
}
export { StudentController };
