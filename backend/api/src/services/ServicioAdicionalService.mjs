import { Db } from "../config/db.mjs";
import { ServicioAdicional } from "../models/ServicioAdicional.mjs";

class ServicioAdicionalService {
  getAll = async () => {
    try {
      const resultados = await new Db().selectQuery("SELECT * FROM servicios_adicionales");
      return resultados.rows.map((element) => ServicioAdicional.fromObject(element));
    } catch (error) {
      console.log("error al listar servicios adicionales", error);
    }
  };

  createServicioAdicional = async (nombre_servicio, descripcion, costo_servicio) => {
    try {
      const nuevoServicio = await new Db().selectQuery(
        `INSERT INTO servicios_adicionales (nombre_servicio, descripcion, costo_servicio) VALUES ($1, $2, $3) RETURNING *`,
        [nombre_servicio, descripcion, costo_servicio]
      );
      if (nuevoServicio.rows.length > 0) {
        return ServicioAdicional.fromObject(nuevoServicio.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear servicio adicional", error);
    }
  };

  updateServicioAdicional = async (id, nombre_servicio, descripcion, costo_servicio) => {
    try {
      const actualizado = await new Db().selectQuery(
        `UPDATE servicios_adicionales SET nombre_servicio=$1, descripcion=$2, costo_servicio=$3 WHERE id_servicio = $4 RETURNING *`,
        [nombre_servicio, descripcion, costo_servicio, id]
      );
      if (actualizado.rows.length > 0) return ServicioAdicional.fromObject(actualizado.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar servicio adicional", error);
    }
  };

  deleteServicioAdicional = async (id) => {
    try {
      await new Db().selectQuery(`DELETE FROM servicios_adicionales WHERE id_servicio = $1 RETURNING *`, [id]);
    } catch (error) {
      console.log("error al eliminar servicio adicional", error);
    }
  };

  getOne = async (id) => {
    try {
      const resultado = await new Db().selectQuery("SELECT * FROM servicios_adicionales WHERE id_servicio = $1", [id]);
      return ServicioAdicional.fromObject(resultado.rows[0]);
    } catch (error) {
      console.log("error al obtener servicio adicional", error);
    }
  };
}

export { ServicioAdicionalService };
