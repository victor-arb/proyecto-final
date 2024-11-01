import express from "express";
import { setContentType } from "./middlewares/middleware.mjs";
import { CourseRoutes } from "./routes/CourseRoutes.mjs";
import { DegreeRoutes } from "./routes/DegreeRoutes.mjs";
import { FacultyRoutes } from "./routes/FacultyRoutes.mjs";
import { ProfessorRoutes } from "./routes/ProfessorRoutes.mjs";
import { StudentRoutes } from "./routes/StudentRoutes.mjs";

const app = express();
app.use(express.json());
app.use(setContentType);

const courseRoutes = new CourseRoutes();
const degreeRoutes = new DegreeRoutes();
const facultyRoutes = new FacultyRoutes();
const professorRoutes = new ProfessorRoutes();
const studentRoutes = new StudentRoutes();

app.use("/courses", courseRoutes.router);
app.use("/degrees", degreeRoutes.router);
app.use("/faculties", facultyRoutes.router);
app.use("/professors", professorRoutes.router);
app.use("/students", studentRoutes.router);

app.all("*", (req, res) => {
  res.status(404).send(JSON.stringify({ message: "NO existe esa ruta" }));
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
