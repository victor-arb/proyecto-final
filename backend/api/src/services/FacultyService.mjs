// Llamados a la DB
import { Db } from "../config/db.mjs";
import { Faculty } from "../models/Faculty.mjs";

class FacultyService {
  getAll = async () => {
    try {
      console.log("getAll en FacultadService");
      const results = await new Db().selectQuery("SELECT * FROM facultades");
      return results.rows.map((element) => Faculty.fromObject(element));
    } catch (error) {
      console.log("error al listar facultades", error);
    }
  };

  createFaculty = async (name) => {
    try {
      const newFaculty = await new Db().selectQuery(
        `INSERT INTO faculty (name) VALUES ($1) RETURNING *`,
        [name]
      );
      if (newFaculty.rows.length > 0) {
        return Faculty.fromObject(nuevo.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear facultades", error);
    }
  };

  updateFaculty = async (id, nombre) => {
    try {
      const updated = await new Db().selectQuery(
        `UPDATE faculty SET name=$1 WHERE id = $2 RETURNING id,name;`,
        [nombre, id]
      );
      if (updated.rows.length > 0)
        return Faculty.fromObject(updated.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar facultades", error);
    }
  };

  deleteFaculty = async (id) => {
    try {
      const deleted = await new Db().selectQuery(
        `DELETE FROM faculty WHERE id = $1 RETURNING id,name,dean_id;`,
        [id]
      );
      if (deleted.rows.length > 0)
        return Faculty.fromObject(deleted.rows[0]);
      return null;
    } catch (error) {
      console.log("error al eliminar facultades", error);
    }
  };

  setDean = async (id, idProfesor) => {
    try {
      new Db().selectQuery(
        `UPDATE faculty SET dean_id=$2 WHERE id = $1 RETURNING id,name,dean_id;`,
        [id, idProfesor]
      );
    } catch (error) {
      console.log("error al eliminar facultades", error);
    }
  };
}

export { FacultyService };
