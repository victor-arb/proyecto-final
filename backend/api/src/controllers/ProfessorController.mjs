import { ProfessorService } from "../services/ProfessorService.mjs";

class ProfessorController {
  #service;
  constructor() {
    this.#service = new ProfessorService();
  }

  getAll = async (req, res) => {
    const list = await this.#service.getAll();
    res.send(list);
  };

  createProfessor = async (req, res) => {
    const { dni, names, surname, date_of_birth } = req.body;
    if (!dni || !names || !surname) {
      return res.status(401).send("datos inválidos");
    }
    const created = await this.#service.createProfessor(
      dni,
      names,
      surname,
      date_of_birth
    );
    console.log(created, "created");
    if (created == null) res.status(500).send("error");
    else res.status(201).send(created);
  };

  updateProfessor = async (req, res) => {
    const { dni } = req.params;
    const { names, surname, date_of_birth } = req.body;
    if (!dni || !names || !surname) {
      return res.status(401).send("datos inválidos");
    }
    const updated = await this.#service.updateProfessor(dni, names, surname, date_of_birth);
    res.status(200).send(updated);
  };

  deleteProfessor = async (req, res) => {
    const { dni } = req.params;
    if (!dni) {
      return res.status(401).send("datos inválidos");
    }
    const deleted = await this.#service.deleteProfessor(dni);
    res.status(201).send(deleted);
  };
}

export { ProfessorController };
