// Llamados a la DB
import { Db } from "../config/db.mjs";
import { Professor } from "../models/Professor.mjs";

class ProfessorService {
  getAllTeachers = async () => {
    try {
      console.log("getAll en ProfessorService");
      const results = await new Db().selectQuery("SELECT * FROM professor");
      return results.rows.map((element) => Professor.fromObject(element));
    } catch (error) {
      console.log("error al listar profesores", error);
    }
  };

  createProfessor = async (dni, name) => {
    try {
      const newProfessor = await new Db().selectQuery(
        `INSERT INTO professor (dni,name) VALUES ($1, $2) RETURNING *`,
        [dni, name]
      );
      if (newProfessor.rows.length > 0) {
        return Professor.fromObject(newProfessor.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear profesores", error);
    }
  };
  updateProfessor = async (id, name) => {
    try {
      const updated = await new Db().selectQuery(
        `UPDATE professor SET name=$1 WHERE id = $2 RETURNING id,nombre;`,
        [name, id]
      );
      if (updated.rows.length > 0)
        return Professor.fromObject(updated.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar profesores", error);
    }
  };

  deleteProfessor = async (id) => {
    try {
      await new Db().selectQuery(
        `DELETE FROM professor WHERE id = $1 RETURNING id,name;`,
        [id]
      );
    } catch (error) {
      console.log("error al eliminar profesores", error);
    }
  };
}

export { ProfessorService };
