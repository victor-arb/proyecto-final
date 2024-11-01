import { CitaService } from "../services/CitaService.mjs";

class CitaController {
  #service;
  constructor() {
    this.#service = new CitaService();
  }

  getAll = async (req, res) => {
    const list = await this.#service.getAll();
    res.send(list);
  };

  createCita = async (req, res) => {
    const { usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total } = req.body;
    if (!usuario_id || !medico_id || !fecha_cita || !hora_cita) {
      return res.status(401).send("Datos inválidos");
    }
    const created = await this.#service.createCita(
      usuario_id,
      medico_id,
      fecha_cita,
      hora_cita,
      estado_cita,
      costo_total
    );
    if (created == null) res.status(500).send("Error al crear la cita");
    else res.status(201).send(created);
  };

  updateCita = async (req, res) => {
    const { id } = req.params;
    const { usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total } = req.body;
    const updated = await this.#service.updateCita(id, usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total);
    res.status(200).send(updated);
  };

  deleteCita = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(401).send("ID inválido");
    }
    const deleted = await this.#service.deleteCita(id);
    res.status(200).send(deleted);
  };
}

export { CitaController };
