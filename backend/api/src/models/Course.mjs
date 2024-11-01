import { Student } from "./Student.mjs";
import { Professor } from "./Professor.mjs";

class Course {
  constructor(code, name, credits) {
    this.code = code;
    this.name = name;
    this.credits = credits;
    this.professor = null;
    this.students = new Set();
  }
  enrollStudent(alumno) {
    if (!(alumno instanceof Student)) {
      throw new Error("Debe ser un objeto de la clase Alumno");
    }
    this.alumnos.add(alumno);
  }
  setProfessor(professor) {
    if (!(professor instanceof Profesor)) {
      throw new Error("Debe ser un objeto de la clase Profesor");
    }
    this.professor = professor;
  }
}

export { Course };
