import { Student } from "./Student.mjs";
import { Faculty } from "./Faculty.mjs";

class Degree {
  constructor(id = null, name) {
    this.id = id;
    this.name = name;
    this.faculty = null;
    this.students = new Set();
  }

  addStudent(student) {
    if (!(student instanceof Student)) {
      throw new Error("Debe ser un objeto de la clase Alumno");
    }
    this.students.add(student);
  }

  setFaculty(faculty) {
    if (!(faculty instanceof Faculty)) {
      throw new Error("Debe ser un objeto de la clase Facultad");
    }
    this.faculty = faculty;
    faculty.addDegree(this);
  }
}

export { Degree };
