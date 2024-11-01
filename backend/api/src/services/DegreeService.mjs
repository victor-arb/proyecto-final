// Llamados a la DB
import { Db } from "../config/db.mjs";
import { Degree } from "../models/Degree.mjs";

class DegreeService {
  getAll = async () => {
    try {
      console.log("getAll en CarreraService");
      const results = await new Db().selectQuery("SELECT * FROM degree");
      return results.rows.map((element) => Degree.fromObject(element));
    } catch (error) {
      console.log("error al listar carreras", error);
    }
  };

  createDegree = async (name) => {
    try {
      const newDegree = await new Db().selectQuery(
        `INSERT INTO degree (nombre) VALUES ($1) RETURNING *`,
        [name]
      );
      if (newDegree.rows.length > 0) {
        return Carrera.fromObject(newDegree.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear carreras", error);
    }
  };

  updateDegree = async (id, name) => {
    try {
      const updated = await new Db().selectQuery(
        `UPDATE degree SET name=$1 WHERE id = $2 RETURNING id,name;`,
        [name, id]
      );
      if (updated.rows.length > 0) return Carrera.fromObject(updated.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar carreras", error);
    }
  };

  deleteDegree = async (id) => {
    try {
      await new Db().selectQuery(
        `DELETE FROM degree WHERE id = $1 RETURNING id,name;`,
        [id]
      );
    } catch (error) {
      console.log("error al eliminar carreras", error);
    }
  };
}

export { DegreeService };
