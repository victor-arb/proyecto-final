import { Db } from "../config/db.mjs";
import { Especialidad } from "../models/Especialidad.mjs";

class EspecialidadService {
  getAll = async () => {
    try {
      const resultados = await new Db().selectQuery("SELECT * FROM especialidades");
      return resultados.rows.map((element) => Especialidad.fromObject(element));
    } catch (error) {
      console.log("error al listar especialidades", error);
    }
  };

  createEspecialidad = async (nombre, descripcion) => {
    try {
      const nuevaEspecialidad = await new Db().selectQuery(
        `INSERT INTO especialidades (nombre, descripcion) VALUES ($1, $2) RETURNING *`,
        [nombre, descripcion]
      );
      if (nuevaEspecialidad.rows.length > 0) {
        return Especialidad.fromObject(nuevaEspecialidad.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear especialidad", error);
    }
  };

  updateEspecialidad = async (id, nombre, descripcion) => {
    try {
      const actualizado = await new Db().selectQuery(
        `UPDATE especialidades SET nombre=$1, descripcion=$2 WHERE id_especialidad = $3 RETURNING *`,
        [nombre, descripcion, id]
      );
      if (actualizado.rows.length > 0) return Especialidad.fromObject(actualizado.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar especialidad", error);
    }
  };

  deleteEspecialidad = async (id) => {
    try {
      await new Db().selectQuery(`DELETE FROM especialidades WHERE id_especialidad = $1 RETURNING *`, [id]);
    } catch (error) {
      console.log("error al eliminar especialidad", error);
    }
  };

  getOne = async (id) => {
    try {
      const resultado = await new Db().selectQuery("SELECT * FROM especialidades WHERE id_especialidad = $1", [id]);
      return Especialidad.fromObject(resultado.rows[0]);
    } catch (error) {
      console.log("error al obtener especialidad", error);
    }
  };
}

export { EspecialidadService };
