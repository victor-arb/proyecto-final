import { Db } from "../config/db.mjs";
import { Cita } from "../models/Cita.mjs";

class CitaService {
  getAll = async () => {
    try {
      const resultados = await new Db().selectQuery("SELECT * FROM citas");
      return resultados.rows.map((element) => Cita.fromObject(element));
    } catch (error) {
      console.log("error al listar citas", error);
    }
  };

  createCita = async (usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total) => {
    try {
      const nuevaCita = await new Db().selectQuery(
        `INSERT INTO citas (usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total]
      );
      if (nuevaCita.rows.length > 0) {
        return Cita.fromObject(nuevaCita.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear cita", error);
    }
  };

  updateCita = async (id, usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total) => {
    try {
      const actualizado = await new Db().selectQuery(
        `UPDATE citas SET usuario_id=$1, medico_id=$2, fecha_cita=$3, hora_cita=$4, estado_cita=$5, costo_total=$6 WHERE id_cita = $7 RETURNING *`,
        [usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total, id]
      );
      if (actualizado.rows.length > 0) return Cita.fromObject(actualizado.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar cita", error);
    }
  };

  deleteCita = async (id) => {
    try {
      await new Db().selectQuery(`DELETE FROM citas WHERE id_cita = $1 RETURNING *`, [id]);
    } catch (error) {
      console.log("error al eliminar cita", error);
    }
  };

  getOne = async (id) => {
    try {
      const resultado = await new Db().selectQuery("SELECT * FROM citas WHERE id_cita = $1", [id]);
      return Cita.fromObject(resultado.rows[0]);
    } catch (error) {
      console.log("error al obtener cita", error);
    }
  };
}

export { CitaService };
