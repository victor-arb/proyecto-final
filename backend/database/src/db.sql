
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS medicos;
DROP TABLE IF EXISTS especialidades;
DROP TABLE IF EXISTS medico_especialidad;
DROP TABLE IF EXISTS horarios;
DROP TABLE IF EXISTS citas;
DROP TABLE IF EXISTS servicios_adicionales;
DROP TABLE IF EXISTS citas_servicios;

-- Crear las tablas con ON DELETE CASCADE

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    cedula VARCHAR(20) UNIQUE,
    celular VARCHAR(20),
    ubicacion VARCHAR(255),
    rol_usuario VARCHAR(20),
    fecha_nacimiento DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medicos (
    id_medico SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    cedula VARCHAR(20) UNIQUE,
    correo VARCHAR(100) UNIQUE,
    celular VARCHAR(20),
    ubicacion_consultorio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE especialidades (
    id_especialidad SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medico_especialidad (
    medico_id INTEGER REFERENCES medicos(id_medico) ON DELETE CASCADE,
    especialidad_id INTEGER REFERENCES especialidades(id_especialidad) ON DELETE CASCADE,
    PRIMARY KEY (medico_id, especialidad_id)
);

CREATE TABLE horarios (
    id_horario SERIAL PRIMARY KEY,
    medico_id INTEGER REFERENCES medicos(id_medico) ON DELETE CASCADE,
    hora_inicio TIME,
    hora_fin TIME,
    dia_semana VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE citas (
    id_cita SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    medico_id INTEGER REFERENCES medicos(id_medico) ON DELETE CASCADE,
    fecha_cita DATE,
    hora_cita TIME,
    estado_cita VARCHAR(20),
    costo_total DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servicios_adicionales (
    id_servicio SERIAL PRIMARY KEY,
    nombre_servicio VARCHAR(100),
    descripcion TEXT,
    costo_servicio DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE citas_servicios (
    cita_id INTEGER REFERENCES citas(id_cita) ON DELETE CASCADE,
    servicio_id INTEGER REFERENCES servicios_adicionales(id_servicio) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cita_id, servicio_id)
);

-- Insertar 10 datos de prueba (mantenidos como en el script original)

-- Insertar usuarios
INSERT INTO usuarios (nombre, apellido, correo, password, cedula, celular, ubicacion, rol_usuario, fecha_nacimiento)
VALUES 
('Juan', 'Pérez', 'juan.perez@email.com', 'password123', 'V-12345678', '0412123456', 'Caracas, Venezuela', 'Paciente', '1990-05-20'),
('Ana', 'González', 'ana.gonzalez@email.com', 'password123', 'V-87654321', '0412567890', 'Valencia, Venezuela', 'Paciente', '1985-03-15'),
('Luis', 'Martínez', 'luis.martinez@email.com', 'password123', 'V-12312312', '0412987654', 'Maracaibo, Venezuela', 'Paciente', '1992-07-25'),
('María', 'López', 'maria.lopez@email.com', 'password123', 'V-23456789', '0412345678', 'Caracas, Venezuela', 'Paciente', '1988-11-30'),
('Carlos', 'Ramírez', 'carlos.ramirez@email.com', 'password123', 'V-23456790', '0412123123', 'Barquisimeto, Venezuela', 'Paciente', '1995-01-10');

-- Insertar médicos
INSERT INTO medicos (nombre, apellido, cedula, correo, celular, ubicacion_consultorio)
VALUES 
('Dr. Alberto', 'Martínez', 'V-99987654', 'alberto.martinez@email.com', '0413123456', 'Consultorio 1, Caracas'),
('Dr. Beatriz', 'Cordero', 'V-87654321', 'beatriz.cordero@email.com', '0413987654', 'Consultorio 2, Valencia'),
('Dr. Felipe', 'Torres', 'V-76543210', 'felipe.torres@email.com', '0414567890', 'Consultorio 3, Maracaibo'),
('Dr. Hugo', 'Ramírez', 'V-87612345', 'hugo.ramirez@email.com', '0412234567', 'Consultorio 4, Caracas'),
('Dr. Carla', 'Suárez', 'V-99887766', 'carla.suarez@email.com', '0412109876', 'Consultorio 5, Valencia');

-- Insertar especialidades
INSERT INTO especialidades (nombre, descripcion)
VALUES 
('Cardiología', 'Especialidad médica relacionada con el corazón'),
('Pediatría', 'Especialidad médica relacionada con la salud infantil'),
('Dermatología', 'Especialidad médica relacionada con la piel'),
('Odontología', 'Especialidad médica relacionada con los dientes y encías'),
('Neurología', 'Especialidad médica relacionada con el sistema nervioso');

-- Insertar médico_especialidad
INSERT INTO medico_especialidad (medico_id, especialidad_id)
VALUES 
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (4, 1), (5, 4);

-- Insertar horarios
INSERT INTO horarios (medico_id, hora_inicio, hora_fin, dia_semana)
VALUES 
(1, '08:00:00', '12:00:00', 'Lunes'),
(2, '09:00:00', '13:00:00', 'Martes'),
(3, '10:00:00', '14:00:00', 'Miércoles'),
(4, '11:00:00', '15:00:00', 'Jueves'),
(5, '12:00:00', '16:00:00', 'Viernes');

-- Insertar citas
INSERT INTO citas (usuario_id, medico_id, fecha_cita, hora_cita, estado_cita, costo_total)
VALUES 
(1, 1, '2024-11-22', '08:30:00', 'Pendiente', 100.00),
(2, 2, '2024-11-23', '09:30:00', 'Confirmada', 150.00),
(3, 3, '2024-11-24', '10:00:00', 'Pendiente', 120.00),
(4, 4, '2024-11-25', '11:00:00', 'Confirmada', 130.00),
(5, 5, '2024-11-26', '12:00:00', 'Pendiente', 110.00);

-- Insertar servicios adicionales
INSERT INTO servicios_adicionales (nombre_servicio, descripcion, costo_servicio)
VALUES 
('Radiografía', 'Servicio de diagnóstico mediante radiografía', 50.00),
('Análisis de sangre', 'Servicio de análisis de sangre', 30.00),
('Ecografía', 'Servicio de diagnóstico mediante ecografía', 70.00),
('Consulta adicional', 'Consulta médica adicional por 30 minutos', 40.00),
('Examen dermatológico', 'Examen especializado para evaluar la piel', 60.00);

-- Insertar citas_servicios
INSERT INTO citas_servicios (cita_id, servicio_id)
VALUES 
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5);


SELECT current_database();
select * from users;