import express from "express";
import { PORT } from "./config.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import serviciosRoutes from "./routes/servicios.routes.js";
import medicosRoutes from "./routes/medicos.routes.js";
import horariosRoutes from "./routes/horarios.routes.js";
import especialidadesRoutes from "./routes/especialidades.routes.js";
import citasRoutes from "./routes/citas.routes.js";
import citasServiciosRoutes from "./routes/citas_servicios.routes.js";




import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(usuariosRoutes)
app.use(serviciosRoutes)
app.use(medicosRoutes)
app.use(horariosRoutes)
app.use(especialidadesRoutes)
app.use(citasRoutes)
app.use(citasServiciosRoutes)

app.listen(PORT);
console.log("Server on port", PORT);