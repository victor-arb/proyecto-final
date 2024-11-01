import { Db } from "../config/db.mjs";
import { Usuario } from "../models/Usuario.mjs";

class UsuarioService {
  getAll = async () => {
    try {
      const resultados = await new Db().selectQuery("SELECT * FROM usuarios");
      return resultados.rows.map((element) => Usuario.fromObject(element));
    } catch (error) {
      console.log("error al listar usuarios", error);
    }
  };

  createUsuario = async (nombre, apellido, correo, password, cedula, celular, ubicacion, rol, fecha_nacimiento) => {
    try {
      const nuevoUsuario = await new Db().selectQuery(
        `INSERT INTO usuarios (nombre, apellido, correo, password, cedula, celular, ubicacion, rol, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [nombre, apellido, correo, password, cedula, celular, ubicacion, rol, fecha_nacimiento]
      );
      if (nuevoUsuario.rows.length > 0) {
        return Usuario.fromObject(nuevoUsuario.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear usuario", error);
    }
  };

  updateUsuario = async (id, nombre, apellido, correo, password, cedula, celular, ubicacion, rol, fecha_nacimiento) => {
    try {
      const actualizado = await new Db().selectQuery(
        `UPDATE usuarios SET nombre=$1, apellido=$2, correo=$3, password=$4, cedula=$5, celular=$6, ubicacion=$7, rol=$8, fecha_nacimiento=$9 WHERE id_usuario = $10 RETURNING *`,
        [nombre, apellido, correo, password, cedula, celular, ubicacion, rol, fecha_nacimiento, id]
      );
      if (actualizado.rows.length > 0) return Usuario.fromObject(actualizado.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar usuario", error);
    }
  };

  deleteUsuario = async (id) => {
    try {
      await new Db().selectQuery(`DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *`, [id]);
    } catch (error) {
      console.log("error al eliminar usuario", error);
    }
  };

  getOne = async (id) => {
    try {
      const resultado = await new Db().selectQuery("SELECT * FROM usuarios WHERE id_usuario = $1", [id]);
      return Usuario.fromObject(resultado.rows[0]);
    } catch (error) {
      console.log("error al obtener usuario", error);
    }
  };
}

export { UsuarioService };
