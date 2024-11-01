import { Especialidad } from "./Especialidad.mjs";
import { Horario } from "./Horario.mjs";

class Medico {
  constructor(id, nombre, apellido, cedula, correo, celular, ubicacionConsultorio) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cedula = cedula;
    this.correo = correo;
    this.celular = celular;
    this.ubicacionConsultorio = ubicacionConsultorio;
    this.especialidades = new Set();
    this.horarios = new Set();
  }

  addEspecialidad(especialidad) {
    if (!(especialidad instanceof Especialidad)) {
      throw new Error("Debe ser un objeto de la clase Especialidad");
    }
    this.especialidades.add(especialidad);
  }

  addHorario(horario) {
    if (!(horario instanceof Horario)) {
      throw new Error("Debe ser un objeto de la clase Horario");
    }
    this.horarios.add(horario);
  }
}

export { Medico };
