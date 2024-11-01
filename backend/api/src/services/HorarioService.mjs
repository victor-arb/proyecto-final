import { Db } from "../config/db.mjs";
import { Horario } from "../models/Horario.mjs";

class HorarioService {
  getAll = async () => {
    try {
      const resultados = await new Db().selectQuery("SELECT * FROM horarios");
      return resultados.rows.map((element) => Horario.fromObject(element));
    } catch (error) {
      console.log("error al listar horarios", error);
    }
  };

  createHorario = async (medico_id, hora_inicio, hora_fin, dia_semana) => {
    try {
      const nuevoHorario = await new Db().selectQuery(
        `INSERT INTO horarios (medico_id, hora_inicio, hora_fin, dia_semana) VALUES ($1, $2, $3, $4) RETURNING *`,
        [medico_id, hora_inicio, hora_fin, dia_semana]
      );
      if (nuevoHorario.rows.length > 0) {
        return Horario.fromObject(nuevoHorario.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear horario", error);
    }
  };

  updateHorario = async (id, medico_id, hora_inicio, hora_fin, dia_semana) => {
    try {
      const actualizado = await new Db().selectQuery(
        `UPDATE horarios SET medico_id=$1, hora_inicio=$2, hora_fin=$3, dia_semana=$4 WHERE id_horario = $5 RETURNING *`,
        [medico_id, hora_inicio, hora_fin, dia_semana, id]
      );
      if (actualizado.rows.length > 0) return Horario.fromObject(actualizado.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar horario", error);
    }
  };

  deleteHorario = async (id) => {
    try {
      await new Db().selectQuery(`DELETE FROM horarios WHERE id_horario = $1 RETURNING *`, [id]);
    } catch (error) {
      console.log("error al eliminar horario", error);
    }
  };

  getOne = async (id) => {
    try {
      const resultado = await new Db().selectQuery("SELECT * FROM horarios WHERE id_horario = $1", [id]);
      return Horario.fromObject(resultado.rows[0]);
    } catch (error) {
      console.log("error al obtener horario", error);
    }
  };
}

export { HorarioService };
