INSERT INTO usuarios (nombre, apellido, correo, password, cedula, celular, ubicacion, rol, fecha_nacimiento) VALUES
('Juan', 'Pérez', 'juan.perez1@gmail.com', 'hashed_password1', '1234567890', '0987654321', 'Ciudad de México', 'paciente', '1980-05-15'),
('María', 'Gómez', 'maria.gomez2@gmail.com', 'hashed_password2', '9876543210', '1234567890', 'Monterrey', 'paciente', '1992-10-25'),
('Carlos', 'Ruiz', 'carlos.ruiz3@gmail.com', 'hashed_password3', '4567891230', '3456789012', 'Guadalajara', 'admin', '1985-07-20'),
('Ana', 'López', 'ana.lopez4@gmail.com', 'hashed_password4', '9876543210', '0981234567', 'Puebla', 'paciente', '1990-03-10'),
('Luis', 'García', 'luis.garcia5@gmail.com', 'hashed_password5', '1236547890', '3456127890', 'Mérida', 'paciente', '1987-12-30'),
('Carolina', 'Hernández', 'carolina.hernandez6@gmail.com', 'hashed_password6', '4563217890', '6789012345', 'Cancún', 'paciente', '1993-08-21'),
('Roberto', 'Ramírez', 'roberto.ramirez7@gmail.com', 'hashed_password7', '7896541230', '4567890123', 'Tijuana', 'paciente', '1978-11-15'),
('Andrea', 'Martínez', 'andrea.martinez8@gmail.com', 'hashed_password8', '9517538520', '1239876540', 'Querétaro', 'paciente', '1989-05-30'),
('Manuel', 'Rojas', 'manuel.rojas9@gmail.com', 'hashed_password9', '3216549870', '5647382910', 'Ciudad de México', 'paciente', '1982-07-14'),
('Gabriela', 'Sánchez', 'gabriela.sanchez10@gmail.com', 'hashed_password10', '7418529630', '3216549871', 'Monterrey', 'paciente', '1995-09-23'),
('Diego', 'Luna', 'diego.luna11@gmail.com', 'hashed_password11', '8523697410', '2198765430', 'Guadalajara', 'paciente', '1984-10-19'),
('Lucía', 'Ortega', 'lucia.ortega12@gmail.com', 'hashed_password12', '9632587410', '2387654901', 'Puebla', 'paciente', '1996-04-25'),
('Fernando', 'Hernández', 'fernando.hernandez13@gmail.com', 'hashed_password13', '1593574860', '3459876120', 'Mérida', 'paciente', '1981-03-07'),
('Carmen', 'Mora', 'carmen.mora14@gmail.com', 'hashed_password14', '7539514560', '8765432109', 'Cancún', 'paciente', '1997-06-13'),
('Isabel', 'Salinas', 'isabel.salinas15@gmail.com', 'hashed_password15', '6541239870', '6549871230', 'Tijuana', 'paciente', '1998-07-25'),


INSERT INTO medicos (nombre, apellido, cedula, correo, celular, ubicacion_consultorio) VALUES
('Ana', 'Martínez', '0012345678', 'ana.martinez@medico.com', '1234567890', 'Ciudad de México'),
('Miguel', 'Santos', '0012345679', 'miguel.santos@medico.com', '1234567891', 'Monterrey'),
('Laura', 'Jiménez', '0012345680', 'laura.jimenez@medico.com', '1234567892', 'Guadalajara'),
('Ricardo', 'Flores', '0012345681', 'ricardo.flores@medico.com', '1234567893', 'Puebla'),
('Patricia', 'Vargas', '0012345682', 'patricia.vargas@medico.com', '1234567894', 'Mérida'),
('José', 'Ortega', '0012345683', 'jose.ortega@medico.com', '1234567895', 'Cancún'),
('Alejandra', 'Ramos', '0012345684', 'alejandra.ramos@medico.com', '1234567896', 'Tijuana'),
('Andrés', 'Mendoza', '0012345685', 'andres.mendoza@medico.com', '1234567897', 'Querétaro'),
('Mónica', 'López', '0012345686', 'monica.lopez@medico.com', '1234567898', 'Ciudad de México'),
('Luis', 'Salazar', '0012345687', 'luis.salazar@medico.com', '1234567899', 'Monterrey'),


INSERT INTO especialidades (nombre, descripcion) VALUES
('Cardiología', 'Especialidad en el diagnóstico y tratamiento de enfermedades del corazón.'),
('Dermatología', 'Especialidad en el tratamiento de afecciones de la piel.'),
('Pediatría', 'Especialidad en el cuidado de la salud infantil.'),
('Neurología', 'Especialidad en el diagnóstico y tratamiento de trastornos neurológicos.'),
('Ortopedia', 'Especialidad en el diagnóstico y tratamiento de enfermedades del sistema músculo-esquelético.'),
('Ginecología', 'Especialidad en el cuidado de la salud reproductiva femenina.'),
('Oftalmología', 'Especialidad en el tratamiento de enfermedades de los ojos.'),
('Psiquiatría', 'Especialidad en el tratamiento de trastornos mentales.'),
('Oncología', 'Especialidad en el tratamiento del cáncer.'),
('Endocrinología', 'Especialidad en el tratamiento de trastornos hormonales.');


INSERT INTO medico_especialidad (medico_id, especialidad_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
(6, 1), (7, 2), (8, 3), (9, 4), (10, 5),
(11, 6), (12, 7), (13, 8), (14, 9), (15, 10),
(16, 1), (17, 2), (18, 3), (19, 4), (20, 5);


INSERT INTO horarios (medico_id, hora_inicio, hora_fin, dia_semana) VALUES
(1, '08:00', '12:00', 'LUNES'),
(1, '14:00', '18:00', 'MIERCOLES'),
(2, '09:00', '13:00', 'MARTES'),
(2, '15:00', '19:00', 'VIERNES'),
(3, '08:00', '12:00', 'JUEVES'),


INSERT INTO servicios_adicionales (nombre_servicio, descripcion, costo_servicio) VALUES
('Rayos X', 'Radiografía para diagnóstico', 300.00),
('Análisis de sangre', 'Exámenes generales de sangre', 200.00),
('Ecografía', 'Examen de ultrasonido', 500.00),
('Electrocardiograma', 'Registro de la actividad eléctrica del corazón', 150.00),
('Terapia física', 'Sesión de terapia de rehabilitación', 250.00);


INSERT INTO citas (usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total) VALUES
(1, 1, '2024-11-01', '08:30', 'pendiente', 500.00),
(2, 2, '2024-11-02', '09:00', 'confirmada', 300.00),
(3, 3, '2024-11-03', '10:30', 'cancelada', 0.00),
(4, 4, '2024-11-04', '11:00', 'completada', 750.00),

INSERT INTO citas_servicios (cita_id, servicio_id) VALUES
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), 
(4, 1), (4, 3), (5, 2), (5, 4);




