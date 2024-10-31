-- Crear tipos ENUM
CREATE TYPE rol_usuario AS ENUM ('admin', 'paciente');
CREATE TYPE estado_cita AS ENUM ('pendiente', 'confirmada', 'cancelada', 'completada');

-- Crear tabla usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    celular VARCHAR(20),
    ubicacion VARCHAR(255),
    rol rol_usuario NOT NULL DEFAULT 'paciente',
    fecha_nacimiento DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla médicos
CREATE TABLE medicos (
    id_medico SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    celular VARCHAR(20),
    ubicacion_consultorio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla especialidades
CREATE TABLE especialidades (
    id_especialidad SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de relación médicos-especialidades
CREATE TABLE medico_especialidad (
    medico_id INTEGER REFERENCES medicos(id_medico) ON DELETE CASCADE,
    especialidad_id INTEGER REFERENCES especialidades(id_especialidad) ON DELETE CASCADE,
    PRIMARY KEY (medico_id, especialidad_id)
);

-- Crear tabla horarios
CREATE TABLE horarios (
    id_horario SERIAL PRIMARY KEY,
    medico_id INTEGER REFERENCES medicos(id_medico) ON DELETE CASCADE,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    dia_semana VARCHAR(20) NOT NULL, -- 'LUNES', 'MARTES', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT horario_valido CHECK (hora_inicio < hora_fin)
);

-- Crear tabla citas
CREATE TABLE citas (
    id_cita SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    medico_id INTEGER REFERENCES medicos(id_medico) ON DELETE CASCADE,
    fecha_cita DATE NOT NULL,
    hora_cita TIME NOT NULL,
    estado_cita estado_cita NOT NULL DEFAULT 'pendiente',
    costo_total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fecha_hora_valida UNIQUE (medico_id, fecha_cita, hora_cita)
);

-- Crear tabla servicios adicionales
CREATE TABLE servicios_adicionales (
    id_servicio SERIAL PRIMARY KEY,
    nombre_servicio VARCHAR(100) NOT NULL,
    descripcion TEXT,
    costo_servicio DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de relación citas-servicios
CREATE TABLE citas_servicios (
    cita_id INTEGER REFERENCES citas(id_cita) ON DELETE CASCADE,
    servicio_id INTEGER REFERENCES servicios_adicionales(id_servicio) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cita_id, servicio_id)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_usuarios_correo ON usuarios(correo);
CREATE INDEX idx_medicos_cedula ON medicos(cedula);
CREATE INDEX idx_citas_fecha ON citas(fecha_cita);
CREATE INDEX idx_citas_medico_fecha ON citas(medico_id, fecha_cita);
CREATE INDEX idx_horarios_medico ON horarios(medico_id);

-- Crear función para validar disponibilidad de horario
CREATE OR REPLACE FUNCTION verificar_disponibilidad_cita()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar si el médico tiene horario para ese día y hora
    IF NOT EXISTS (
        SELECT 1 FROM horarios
        WHERE medico_id = NEW.medico_id
        AND dia_semana = TRIM(TO_CHAR(NEW.fecha_cita, 'DAY'))
        AND hora_inicio <= NEW.hora_cita
        AND hora_fin > NEW.hora_cita
    ) THEN
        RAISE EXCEPTION 'El médico no tiene horario disponible en esta fecha y hora';
    END IF;

    -- Verificar si ya existe una cita en ese horario
    IF EXISTS (
        SELECT 1 FROM citas
        WHERE medico_id = NEW.medico_id
        AND fecha_cita = NEW.fecha_cita
        AND hora_cita = NEW.hora_cita
        AND id_cita != COALESCE(NEW.id_cita, 0)
        AND estado_cita != 'cancelada'
    ) THEN
        RAISE EXCEPTION 'Ya existe una cita programada en este horario';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para validar disponibilidad antes de insertar o actualizar citas
CREATE TRIGGER validar_disponibilidad_cita
BEFORE INSERT OR UPDATE ON citas
FOR EACH ROW
EXECUTE FUNCTION verificar_disponibilidad_cita();

-- Crear función para actualizar costo total
CREATE OR REPLACE FUNCTION actualizar_costo_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE citas
    SET costo_total = (
        SELECT COALESCE(SUM(costo_servicio), 0)
        FROM servicios_adicionales sa
        INNER JOIN citas_servicios cs ON sa.id_servicio = cs.servicio_id
        WHERE cs.cita_id = NEW.cita_id
    )
    WHERE id_cita = NEW.cita_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para actualizar costo total cuando se agregan servicios
CREATE TRIGGER actualizar_costo_cita
AFTER INSERT OR DELETE ON citas_servicios
FOR EACH ROW
EXECUTE FUNCTION actualizar_costo_total();

-- Agregar comentarios a las tablas
COMMENT ON TABLE usuarios IS 'Almacena la información de los usuarios del sistema';
COMMENT ON TABLE medicos IS 'Almacena la información de los médicos';
COMMENT ON TABLE especialidades IS 'Catálogo de especialidades médicas';
COMMENT ON TABLE citas IS 'Registro de citas médicas';
COMMENT ON TABLE servicios_adicionales IS 'Catálogo de servicios adicionales disponibles';