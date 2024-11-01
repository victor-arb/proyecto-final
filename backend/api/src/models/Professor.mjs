import { Course } from "./Course.mjs";
import { Faculty } from "./Faculty.mjs";

class Professor {
  constructor(dni, names, surname) {
    this.dni = dni;
    this.names = names;
    this.surname = surname;
    this.directedFaculty = null;
    this.courses = new Set();
  }

  setDirectedFaculty(faculty) {
    if (!(faculty instanceof Faculty)) {
      throw new Error("Debe ser un objeto Facultad");
    }
    this.directedFaculty = faculty;
    faculty.setDirector(this);
  }

  teachCourse(course) {
    if (!(course instanceof Course)) {
      throw new Error("Debe ser un objeto de la clase Curso");
    }
    this.cursos.add(curso);
    curso.asignarProfesor(this);
  }
}
export { Professor };
