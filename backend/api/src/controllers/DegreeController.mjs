// Manipulo el request/response

import { DegreeService } from "../services/DegreeService.mjs";

// llamo a los servicios
class DegreeController {
  #service;
  constructor() {
    this.#service = new DegreeService();
  }
  getAll = async (req, res) => {
    const lista = await this.#service.getAll();
    res.send(lista);
  };

  createDegree = async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send("datos inválidos");
    }
    const newDegree = await this.#service.crearCarrera(name);
    console.log(newDegree, "newDegree");
    if (newDegree == null) res.status(500).send("error");
    else res.status(201).send(newDegree);
  };

  updateDegree = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(401).send("datos inválidos");
    }
    const updated = await this.#service.updateDegree(name);
    res.status(200).send(updated);
  };

  deleteDegree = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(401).send("datos inválidos");
    }
    const deleted = await this.#service.deleteDegree(id);
    res.status(201).send(deleted);
  };
}
export { DegreeController };
