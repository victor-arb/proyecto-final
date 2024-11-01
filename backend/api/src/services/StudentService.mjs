// Llamados a la DB
import { Db } from "../config/db.mjs";
import { Course } from "../models/Course.mjs";
import { Student } from "../models/Student.mjs";

const retuninString = `
          dni,
          names,
          surname,
          date_of_birth, 
          extract(year FROM age(current_date, date_of_birth))`;
class StudentService {
  getAll = async () => {
    const client = new Db();
    try {
      console.log("getAll at StudentService");
      const results = await client.selectQuery(
        `SELECT ${retuninString}
        FROM student;`
      );
      return results.rows.map((element) => Student.fromObject(element));
    } catch (error) {
      console.log("error al listar alumnos", error);
    }
  };

  createStudent = async (dni, names, surname, dateOfBirth) => {
    try {
      const client = new Db();
      const nuevo = await client.selectQuery(
        `INSERT INTO student (dni, names, surname, date_of_birth) 
        VALUES ($1, $2, $3, $4) RETURNING ${retuninString}`,
        [dni, names, surname, dateOfBirth]
      );
      if (nuevo.rows.length > 0) {
        return Student.fromObject(nuevo.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear alumno", error);
      return null;
    }
  };
  updateStudent = async (dni, names, surname, dateOfBirth) => {
    try {
      const client = new Db();
      const updated = await client.selectQuery(
        `UPDATE student SET cedula = $1, 
            nombres = $2, 
            apellidos = $3, 
            fecha_nacimiento = $4 
          WHERE cedula = $1 
          RETURNING ${retuninString};`,
        [cedula, nombres, apellidos, fechaNacimiento]
      );
      if (actualizada.rows.length > 0)
        return Alumno.fromObject(actualizada.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar alumno", error);
    }
  };
  borrarAlumno = async (cedula) => {
    try {
      const obj = new Db().selectQuery(
        `delete FROM facultades WHERE cedula = $1 RETURNING ${retuninString};`,
        [cedula]
      );
      return Alumno.fromObject(obj);
    } catch (error) {
      console.log("error al eliminar alumno", error);
    }
  };
  getCourses = async (dni) => {
    const client = new Db();
    try {
      console.log("getCouses en AlumnoService");
      const results = await client.selectQuery(
        "SELECT * FROM course WHERE code IN (SELECT course_code FROM enrollment WHERE student_dni = $1)",
        [dni]
      );
      return results.rows.map(
        ({ code, name, semester }) => new Course(code, name, semester)
      );
    } catch (error) {
      console.log("error al listar alumnos", error);
    }
  };

  enrollCourse = async (dni, courseCode, semester) => {
    const client = new Db();
    try {
      console.log("enrollCourse at StudentService");
      const results = await client.selectQuery(
        `INSERT INTO
          enrollment (course_code, student_dni, semester)
        VALUES
          ($1, $2, $3)
        RETURNING course_code, student_dni, semester;`,
        [courseCode, dni, semester]
      );
      console.log(results);
      return results.rows[0];
    } catch (error) {
      console.log("error at enrolling student on course", error);
      return null;
    }
  };
}

export { StudentService };
