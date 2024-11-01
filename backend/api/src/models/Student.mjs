import { Degree } from "./Degree.mjs";
import { Course } from "./Course.mjs";

class Student {
  #age;
  constructor(dni, names, surname, dateOfBirth = null) {
    this.dni = dni;
    this.names = names;
    this.surname = surname;
    this.dateOfBirth = dateOfBirth;
    // this.#setAge();
    this.Degree = null;
    this.courses = new Set();
  }

  #setAge() {
    if (!this.dateOfBirth) {
      return (this.age = null);
    }
    const aDay = 24 * 60 * 60 * 1000;
    const numDays = (new Date() - this.dateOfBirth) / aDay;
    this.#age = Math.floor(numDays / 365.25);
  }
  get age() {
    return this.#age;
  }

  static fromObject(obj) {
    const { dni, names, surname, date_of_birth, age } = obj;
    const std = new Student(dni, names, surname);
    std.dateOfBirth = date_of_birth;
    std.#age = age;
    return std;
  }

  enrollDegree(degree) {
    if (!(degree instanceof Degree)) {
      throw new Error("Debe ser un objeto de la clase Carrera");
    }
    this.degree = degree;
    degree.addStudent(this);
  }

  enrollCourse(course) {
    if (!(course instanceof Course)) {
      throw new Error("Debe ser un objeto de la clase Curso");
    }
    this.courses.add(course);
    course.enrollStudent(this);
  }
}

export { Student };
