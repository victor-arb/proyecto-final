import { Db } from "../config/db.mjs";
import { Medico } from "../models/Medico.mjs";

class MedicoService {
  getAll = async () => {
    try {
      const resultados = await new Db().selectQuery("SELECT * FROM medicos");
      return resultados.rows.map((element) => Medico.fromObject(element));
    } catch (error) {
      console.log("error al listar médicos", error);
    }
  };

  createMedico = async (nombre, apellido, cedula, correo, celular, ubicacion_consultorio) => {
    try {
      const nuevoMedico = await new Db().selectQuery(
        `INSERT INTO medicos (nombre, apellido, cedula, correo, celular, ubicacion_consultorio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [nombre, apellido, cedula, correo, celular, ubicacion_consultorio]
      );
      if (nuevoMedico.rows.length > 0) {
        return Medico.fromObject(nuevoMedico.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear médico", error);
    }
  };

  updateMedico = async (id, nombre, apellido, cedula, correo, celular, ubicacion_consultorio) => {
    try {
      const actualizado = await new Db().selectQuery(
        `UPDATE medicos SET nombre=$1, apellido=$2, cedula=$3, correo=$4, celular=$5, ubicacion_consultorio=$6 WHERE id_medico = $7 RETURNING *`,
        [nombre, apellido, cedula, correo, celular, ubicacion_consultorio, id]
      );
      if (actualizado.rows.length > 0) return Medico.fromObject(actualizado.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar médico", error);
    }
  };

  deleteMedico = async (id) => {
    try {
      await new Db().selectQuery(`DELETE FROM medicos WHERE id_medico = $1 RETURNING *`, [id]);
    } catch (error) {
      console.log("error al eliminar médico", error);
    }
  };

  getOne = async (id) => {
    try {
      const resultado = await new Db().selectQuery("SELECT * FROM medicos WHERE id_medico = $1", [id]);
      return Medico.fromObject(resultado.rows[0]);
    } catch (error) {
      console.log("error al obtener médico", error);
    }
  };
}

export { MedicoService };
