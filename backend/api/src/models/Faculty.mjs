import { Degree } from "./Degree.mjs";
import { Professor } from "./Professor.mjs";

// Clase que modela la entidad
class Faculty {
  constructor(id = null, name) {
    this.id = id;
    this.name = name;
    this.director = null;
    this.degrees = new Set();
  }
  static fromObject(obj) {
    const { id, name } = obj;
    return new Faculty(id, name);
  }
  setDirector(professor) {
    if (!(professor instanceof Professor)) {
      throw new Error("Debe ser una instancia de la clase Profesor");
    }
    this.director = professor;
  }
  addDegree(degree) {
    if (!(degree instanceof Degree)) {
      throw new Error("Debe ser un objeto de la clase Carrera");
    }
    this.degrees.add(degree);
  }
}
export { Faculty };
