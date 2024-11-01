import { FacultyService } from "../services/FacultyService.mjs";
// Manipulo el request/response
// llamo a los servicios
class FacultyController {
  #service;
  constructor() {
    this.#service = new FacultyService();
  }

  getAll = async (req, res) => {
    const facultades = await this.#service.getAll();
    res.send(facultades);
  };

  createFaculty = async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send("datos inválidos");
    }
    const created = await this.#service.createFaculty(name);
    // console.log(nueva);
    res.status(201).send(created);
  };

  updateFaculty = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || !id) {
      return res.status(401).send("datos inválidos");
    }
    const updated = await this.#service.updateFaculty(id, name);
    res.status(200).send(updated);
  };

  deleteFaculty = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(401).send("datos inválidos");
    }
    const deleted = await this.#service.deleteFaculty(id);
    res.status(201).send(deleted);
  };
}
export { FacultyController };
