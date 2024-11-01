import { ServicioAdicionalService } from "../services/ServicioAdicionalService.mjs";

class ServicioAdicionalController {
  #service;
  constructor() {
    this.#service = new ServicioAdicionalService();
  }

  getAll = async (req, res) => {
    const list = await this.#service.getAll();
    res.send(list);
  };

  createServicioAdicional = async (req, res) => {
    const { nombre_servicio, descripcion, costo_servicio } = req.body;
    if (!nombre_servicio || !costo_servicio) {
      return res.status(401).send("Datos inválidos");
    }
    const created = await this.#service.createServicioAdicional(nombre_servicio, descripcion, costo_servicio);
    if (created == null) res.status(500).send("Error al crear el servicio adicional");
    else res.status(201).send(created);
  };

  updateServicioAdicional = async (req, res) => {
    const { id } = req.params;
    const { nombre_servicio, descripcion, costo_servicio } = req.body;
    const updated = await this.#service.updateServicioAdicional(id, nombre_servicio, descripcion, costo_servicio);
    res.status(200).send(updated);
  };

  deleteServicioAdicional = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(401).send("ID inválido");
    }
    const deleted = await this.#service.deleteServicioAdicional(id);
    res.status(200).send(deleted);
  };
}

export { ServicioAdicionalController };
