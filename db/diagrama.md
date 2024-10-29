erDiagram
    usuarios {
        SERIAL id_usuario PK
        VARCHAR(100) nombre
        VARCHAR(100) apellido
        VARCHAR(100) correo UK
        VARCHAR(255) password
        VARCHAR(20) cedula UK
        VARCHAR(20) celular
        VARCHAR(255) ubicacion
        rol_usuario rol
        DATE fecha_nacimiento
        TIMESTAMP created_at
    }

    medicos {
        SERIAL id_medico PK
        VARCHAR(100) nombre
        VARCHAR(100) apellido
        VARCHAR(20) cedula UK
        VARCHAR(100) correo UK
        VARCHAR(20) celular
        VARCHAR(255) ubicacion_consultorio
        TIMESTAMP created_at
    }

    especialidades {
        SERIAL id_especialidad PK
        VARCHAR(100) nombre
        TEXT descripcion
        TIMESTAMP created_at
    }

    medico_especialidad {
        INTEGER medico_id FK
        INTEGER especialidad_id FK
    }

    horarios {
        SERIAL id_horario PK
        INTEGER medico_id FK
        TIME hora_inicio
        TIME hora_fin
        VARCHAR(20) dia_semana
        TIMESTAMP created_at
    }

    citas {
        SERIAL id_cita PK
        INTEGER usuario_id FK
        INTEGER medico_id FK
        DATE fecha_cita
        TIME hora_cita
        estado_cita estado_cita
        DECIMAL(10,2) costo_total
        TIMESTAMP created_at
    }

    servicios_adicionales {
        SERIAL id_servicio PK
        VARCHAR(100) nombre_servicio
        TEXT descripcion
        DECIMAL(10,2) costo_servicio
        TIMESTAMP created_at
    }

    citas_servicios {
        INTEGER cita_id FK
        INTEGER servicio_id FK
        TIMESTAMP created_at
    }

    usuarios ||--o{ citas : "agenda"
    medicos ||--o{ citas : "atiende"
    medicos ||--o{ horarios : "tiene"
    medicos ||--o{ medico_especialidad : "tiene"
    especialidades ||--o{ medico_especialidad : "tiene"
    citas ||--o{ citas_servicios : "tiene"
    servicios_adicionales ||--o{ citas_servicios : "tiene"