import express from "express";
import { setContentType } from "./middlewares/middleware.mjs";
import { UsuarioRoutes } from "./routes/UsuarioRoutes.mjs";
import { MedicoRoutes } from "./routes/MedicoRoutes.mjs";
import { EspecialidadRoutes } from "./routes/EspecialidadRoutes.mjs";
import { HorarioRoutes } from "./routes/HorarioRoutes.mjs";
import { CitaRoutes } from "./routes/CitaRoutes.mjs";
import { ServicioAdicionalRoutes } from "./routes/ServicioAdicionalRoutes.mjs";

const app = express();
app.use(express.json());
app.use(setContentType);

// Instancia de rutas para cada entidad
const usuarioRoutes = new UsuarioRoutes();
const medicoRoutes = new MedicoRoutes();
const especialidadRoutes = new EspecialidadRoutes();
const horarioRoutes = new HorarioRoutes();
const citaRoutes = new CitaRoutes();
const servicioAdicionalRoutes = new ServicioAdicionalRoutes();

// Mapeo de rutas
app.use("/usuarios", usuarioRoutes.router);
app.use("/medicos", medicoRoutes.router);
app.use("/especialidades", especialidadRoutes.router);
app.use("/horarios", horarioRoutes.router);
app.use("/citas", citaRoutes.router);
app.use("/servicios-adicionales", servicioAdicionalRoutes.router);

// Manejo de rutas inexistentes
app.all("*", (req, res) => {
  res.status(404).send(JSON.stringify({ message: "No existe esa ruta" }));
});

// Inicialización del servidor
app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
