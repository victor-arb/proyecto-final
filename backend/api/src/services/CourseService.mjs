// Llamados a la DB
import { Db } from "../config/db.mjs";
import { Course } from "../models/Course.mjs";

class CourseService {
  getAll = async () => {
    try {
      console.log("getAll en CursosService");
      const resultados = await new Db().selectQuery("SELECT * FROM course");
      return resultados.rows.map((element) => Course.fromObject(element));
    } catch (error) {
      console.log("error al listar cursos", error);
    }
  };

  createCourse = async (code, name, credits) => {
    try {
      const newCourse = await new Db().selectQuery(
        `INSERT INTO course (code, name, credits) VALUES ($1, $2, $3) RETURNING *`,
        [code, name, credits]
      );
      if (nuevo.rows.length > 0) {
        return Curso.fromObject(nuevo.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear cursos", error);
    }
  };

  updateCourse = async (code, name, credits) => {
    try {
      const updated = await new Db().selectQuery(
        `UPDATE course SET nombre=$1, creditos=$2 WHERE id = $3 RETURNING code,name,credits;`,
        [code, name, credits]
      );
      if (updated.rows.length > 0) return Curso.fromObject(updated.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar cursos", error);
    }
  };

  deleteCourse = async (code) => {
    try {
      await new Db().selectQuery(
        `delete FROM cursos WHERE codigo = $1 RETURNING codigo,nombre,creditos;`,
        [codigo]
      );
    } catch (error) {
      console.log("error al eliminar cursos", error);
    }
  };

  getOne = async (courseCode) => {
    try {
      const results = await new Db().selectQuery(
        "SELECT * FROM course WHERE code = $1",
        [courseCode]
      );
      const { code, name, credits } = results.rows[0];
      // console.log(results.rows);
      return new Course(code, name, credits);
    } catch (error) {
      console.log("error al listar cursos", error);
    }
  };
}

export { CourseService };
