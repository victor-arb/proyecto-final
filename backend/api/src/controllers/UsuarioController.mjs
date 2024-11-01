import { UsuarioService } from "../services/UsuarioService.mjs";

class UsuarioController {
  #service;
  constructor() {
    this.#service = new UsuarioService();
  }

  getAll = async (req, res) => {
    const list = await this.#service.getAll();
    res.send(list);
  };

  createUsuario = async (req, res) => {
    const { nombre, apellido, correo, password, cedula, celular, ubicacion, rol, fecha_nacimiento } = req.body;
    if (!nombre || !apellido || !correo || !password || !cedula) {
      return res.status(401).send("Datos inválidos");
    }
    const created = await this.#service.createUsuario(
      nombre,
      apellido,
      correo,
      password,
      cedula,
      celular,
      ubicacion,
      rol,
      fecha_nacimiento
    );
    if (created == null) res.status(500).send("Error al crear el usuario");
    else res.status(201).send(created);
  };

  updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, celular, ubicacion, rol, fecha_nacimiento } = req.body;
    if (!nombre || !apellido || !correo) {
      return res.status(401).send("Datos inválidos");
    }
    const updated = await this.#service.updateUsuario(
      id,
      nombre,
      apellido,
      correo,
      celular,
      ubicacion,
      rol,
      fecha_nacimiento
    );
    res.status(200).send(updated);
  };

  deleteUsuario = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(401).send("ID inválido");
    }
    const deleted = await this.#service.deleteUsuario(id);
    res.status(200).send(deleted);
  };
}

export { UsuarioController };
