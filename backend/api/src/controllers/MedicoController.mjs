import { MedicoService } from "../services/MedicoService.mjs";

class MedicoController {
  #service;
  constructor() {
    this.#service = new MedicoService();
  }

  getAll = async (req, res) => {
    const list = await this.#service.getAll();
    res.send(list);
  };

  createMedico = async (req, res) => {
    const { nombre, apellido, cedula, correo, celular, ubicacion_consultorio } = req.body;
    if (!nombre || !apellido || !cedula || !correo) {
      return res.status(401).send("Datos inválidos");
    }
    const created = await this.#service.createMedico(
      nombre,
      apellido,
      cedula,
      correo,
      celular,
      ubicacion_consultorio
    );
    if (created == null) res.status(500).send("Error al crear el médico");
    else res.status(201).send(created);
  };

  updateMedico = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, cedula, correo, celular, ubicacion_consultorio } = req.body;
    if (!nombre || !apellido || !cedula || !correo) {
      return res.status(401).send("Datos inválidos");
    }
    const updated = await this.#service.updateMedico(
      id,
      nombre,
      apellido,
      cedula,
      correo,
      celular,
      ubicacion_consultorio
    );
    res.status(200).send(updated);
  };

  deleteMedico = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(401).send("ID inválido");
    }
    const deleted = await this.#service.deleteMedico(id);
    res.status(200).send(deleted);
  };
}

export { MedicoController };
