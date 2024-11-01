import { Cita } from "./Cita.mjs";

class Usuario {
  constructor(id, nombre, apellido, correo, password, cedula, celular, ubicacion, rol, fechaNacimiento) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.password = password;
    this.cedula = cedula;
    this.celular = celular;
    this.ubicacion = ubicacion;
    this.rol = rol;
    this.fechaNacimiento = fechaNacimiento;
    this.citas = new Set();
  }

  addCita(cita) {
    if (!(cita instanceof Cita)) {
      throw new Error("Debe ser un objeto de la clase Cita");
    }
    this.citas.add(cita);
  }
}

export { Usuario };
