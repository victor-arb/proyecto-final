import { EspecialidadService } from "../services/EspecialidadService.mjs";

class EspecialidadController {
  #service;
  constructor() {
    this.#service = new EspecialidadService();
  }

  getAll = async (req, res) => {
    const list = await this.#service.getAll();
    res.send(list);
  };

  createEspecialidad = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
      return res.status(401).send("Datos inválidos");
    }
    const created = await this.#service.createEspecialidad(nombre, descripcion);
    if (created == null) res.status(500).send("Error al crear la especialidad");
    else res.status(201).send(created);
  };

  updateEspecialidad = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    if (!nombre) {
      return res.status(401).send("Datos inválidos");
    }
    const updated = await this.#service.updateEspecialidad(id, nombre, descripcion);
    res.status(200).send(updated);
  };

  deleteEspecialidad = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(401).send("ID inválido");
    }
    const deleted = await this.#service.deleteEspecialidad(id);
    res.status(200).send(deleted);
  };
}

export { EspecialidadController };
