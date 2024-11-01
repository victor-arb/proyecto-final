import { HorarioService } from "../services/HorarioService.mjs";

class HorarioController {
  #service;
  constructor() {
    this.#service = new HorarioService();
  }

  getAll = async (req, res) => {
    const list = await this.#service.getAll();
    res.send(list);
  };

  createHorario = async (req, res) => {
    const { medico_id, hora_inicio, hora_fin, dia_semana } = req.body;
    if (!medico_id || !hora_inicio || !hora_fin || !dia_semana) {
      return res.status(401).send("Datos inválidos");
    }
    const created = await this.#service.createHorario(medico_id, hora_inicio, hora_fin, dia_semana);
    if (created == null) res.status(500).send("Error al crear el horario");
    else res.status(201).send(created);
  };

  updateHorario = async (req, res) => {
    const { id } = req.params;
    const { medico_id, hora_inicio, hora_fin, dia_semana } = req.body;
    if (!hora_inicio || !hora_fin || !dia_semana) {
      return res.status(401).send("Datos inválidos");
    }
    const updated = await this.#service.updateHorario(id, medico_id, hora_inicio, hora_fin, dia_semana);
    res.status(200).send(updated);
  };

  deleteHorario = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(401).send("ID inválido");
    }
    const deleted = await this.#service.deleteHorario(id);
    res.status(200).send(deleted);
  };
}

export { HorarioController };
