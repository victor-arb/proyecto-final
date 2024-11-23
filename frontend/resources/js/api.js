const API_URL = 'https://localhost:6868'; // Base de la API
const mainContent = document.getElementById('main-content');
const navLinks = document.getElementById('nav-links');

document.addEventListener('DOMContentLoaded', () => {
    renderHome();
    setupNavigation();
});

function setupNavigation() {
    document.getElementById('home-link').addEventListener('click', renderHome);
    document.getElementById('login-link').addEventListener('click', renderLoginForm);
    document.getElementById('register-link').addEventListener('click', renderRegisterForm);
    document.getElementById('logout-link').addEventListener('click', logout);
    document.getElementById('citas-link').addEventListener('click', renderCitasModule);
    document.getElementById('admin-link').addEventListener('click', renderAdminModule);
}

function renderHome() {
    mainContent.innerHTML = `
        <h2>Bienvenido</h2>
        <p>Seleccione una opción del menú para continuar. Debes estar logueado para acceder a las funcionalidades.</p>
    `;
}

function renderLoginForm() {
    mainContent.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <form id="login-form">
            <label for="correo">Correo:</label>
            <input type="email" id="correo" required>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
    `;

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const correo = document.getElementById('correo').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Inicio de sesión exitoso');
                localStorage.setItem('user', JSON.stringify(data));
                updateNav(data.rol_usuario);
            } else {
                alert(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor');
        }
    });
}

function renderRegisterForm() {
    mainContent.innerHTML = `
        <h2>Registro</h2>
        <form id="register-form">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" required>
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" required>
            <label for="correo">Correo:</label>
            <input type="email" id="correo" required>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" required>
            <label for="cedula">Cédula:</label>
            <input type="text" id="cedula" required>
            <label for="celular">Celular:</label>
            <input type="text" id="celular">
            <label for="ubicacion">Ubicación:</label>
            <input type="text" id="ubicacion">
            <label for="rol_usuario">Rol:</label>
            <select id="rol_usuario" required>
                <option value="usuario">Usuario</option>
                <option value="admin">Admin</option>
            </select>
            <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
            <input type="date" id="fecha_nacimiento" required>
            <button type="submit">Registrarse</button>
        </form>
    `;

    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const userData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            correo: document.getElementById('correo').value,
            password: document.getElementById('password').value,
            cedula: document.getElementById('cedula').value,
            celular: document.getElementById('celular').value,
            ubicacion: document.getElementById('ubicacion').value,
            rol_usuario: document.getElementById('rol_usuario').value,
            fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
        };

        try {
            const response = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registro exitoso');
                renderLoginForm();
            } else {
                alert(data.message || 'Error al registrarse');
            }
        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor');
        }
    });
}

function logout() {
    localStorage.removeItem('user');
    alert('Sesión cerrada.');
    updateNav(null);
    renderHome();
}

function updateNav(role) {
    const isAdmin = role === 'admin';
    document.getElementById('login-link').classList.toggle('hidden', !!role);
    document.getElementById('register-link').classList.toggle('hidden', !!role);
    document.getElementById('logout-link').classList.toggle('hidden', !role);
    document.getElementById('citas-link').classList.toggle('hidden', !role);
    document.getElementById('admin-link').classList.toggle('hidden', !isAdmin);
}

async function renderCitasModule() {
    mainContent.innerHTML = `
        <h2>Módulo de Citas</h2>
        <form id="search-form">
            <label for="especialidad">Especialidad:</label>
            <select id="especialidad" required></select>
            <label for="ubicacion">Ubicación:</label>
            <input type="text" id="ubicacion" placeholder="Ciudad o dirección">
            <label for="fecha-hora">Fecha y Hora:</label>
            <input type="datetime-local" id="fecha-hora">
            <button type="submit">Buscar</button>
        </form>
        <div id="results" class="results-container"></div>
    `;

    await populateEspecialidades();

    document.getElementById('search-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const especialidad = document.getElementById('especialidad').value;
        const ubicacion = document.getElementById('ubicacion').value;
        const fechaHora = document.getElementById('fecha-hora').value;

        await buscarMedicos(especialidad, ubicacion, fechaHora);
    });
}

async function populateEspecialidades() {
    try {
        const response = await fetch(`${API_URL}/especialidades`);
        const especialidades = await response.json();
        const select = document.getElementById('especialidad');

        especialidades.forEach((esp) => {
            const option = document.createElement('option');
            option.value = esp.id_especialidad;
            option.textContent = esp.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar especialidades:', error);
    }
}

async function buscarMedicos(especialidad, ubicacion, fechaHora) {
    try {
        const response = await fetch(
            `${API_URL}/medicos?especialidad=${especialidad}&ubicacion=${ubicacion}&fecha=${fechaHora}`
        );
        const medicos = await response.json();
        renderMedicos(medicos);
    } catch (error) {
        console.error('Error al buscar médicos:', error);
    }
}

function renderMedicos(medicos) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (medicos.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron médicos.</p>';
        return;
    }

    medicos.forEach((medico) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${medico.nombre} ${medico.apellido}</h3>
            <p><strong>Ubicación:</strong> ${medico.ubicacion_consultorio}</p>
            <p><strong>Especialidades:</strong> ${medico.especialidades.join(', ')}</p>
            <button class="select-btn" data-id="${medico.id_medico}">Seleccionar</button>
        `;
        resultsContainer.appendChild(card);
    });

    document.querySelectorAll('.select-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const medicoId = e.target.dataset.id;
            renderDetallesCita(medicoId);
        });
    });
}

async function renderDetallesCita(medicoId) {
    mainContent.innerHTML = `
        <h2>Detalles de la Cita</h2>
        <div id="medico-detalles"></div>
        <form id="servicios-form">
            <h3>Servicios Adicionales</h3>
            <div id="servicios-container"></div>
            <button type="submit">Reservar Cita</button>
        </form>
        <div id="resumen"></div>
    `;

    await cargarMedicoDetalles(medicoId);
    await cargarServiciosAdicionales();

    document.getElementById('servicios-form').addEventListener('submit', (e) => {
        e.preventDefault();
        procesarCita(medicoId);
    });
}

async function cargarMedicoDetalles(medicoId) {
    try {
        const response = await fetch(`${API_URL}/medicos/${medicoId}`);
        const medico = await response.json();

        const detallesDiv = document.getElementById('medico-detalles');
        detallesDiv.innerHTML = `
            <h3>${medico.nombre} ${medico.apellido}</h3>
            <p><strong>Ubicación:</strong> ${medico.ubicacion_consultorio}</p>
            <p><strong>Especialidades:</strong> ${medico.especialidades.join(', ')}</p>
        `;
    } catch (error) {
        console.error('Error al cargar detalles del médico:', error);
    }
}

async function cargarServiciosAdicionales() {
    try {
        const response = await fetch(`${API_URL}/servicios`);
        const servicios = await response.json();

        const container = document.getElementById('servicios-container');
        servicios.forEach((servicio) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <label>
                    <input type="checkbox" value="${servicio.id_servicio}" data-costo="${servicio.costo_servicio}">
                    ${servicio.nombre_servicio} (${servicio.costo_servicio} USD)
                </label>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error al cargar servicios adicionales:', error);
    }
}

async function procesarCita(medicoId) {
    const serviciosSeleccionados = Array.from(
        document.querySelectorAll('#servicios-container input:checked')
    ).map((input) => ({
        id_servicio: input.value,
        costo: parseFloat(input.dataset.costo),
    }));

    const costoTotal = serviciosSeleccionados.reduce((sum, s) => sum + s.costo, 0);

    const resumenDiv = document.getElementById('resumen');
    resumenDiv.innerHTML = `
        <h3>Resumen de la Cita</h3>
        <p><strong>Costo Total:</strong> ${costoTotal} USD</p>
        <button id="confirm-btn">Confirmar Cita</button>
    `;

    document.getElementById('confirm-btn').addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_URL}/citas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    medico_id: medicoId,
                    servicios: serviciosSeleccionados.map((s) => s.id_servicio),
                    costo_total: costoTotal,
                }),
            });

            if (response.ok) {
                alert('Cita registrada exitosamente.');
                renderCitasModule();
            } else {
                alert('Error al registrar la cita.');
            }
        } catch (error) {
            console.error('Error al confirmar cita:', error);
        }
    });
}

async function renderAdminModule() {
    mainContent.innerHTML = `
        <h2>Módulo Administrativo</h2>
        <nav class="admin-nav">
            <button id="manage-medicos">Gestionar Médicos</button>
            <button id="manage-especialidades">Gestionar Especialidades</button>
            <button id="manage-horarios">Gestionar Horarios</button>
        </nav>
        <div id="admin-content"></div>
    `;

    document.getElementById('manage-medicos').addEventListener('click', renderMedicosModule);
    document.getElementById('manage-especialidades').addEventListener('click', renderEspecialidadesModule);
    document.getElementById('manage-horarios').addEventListener('click', renderHorariosModule);
}

async function renderMedicosModule() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <h3>Gestión de Médicos</h3>
        <button id="add-medico">Agregar Médico</button>
        <div id="medicos-list"></div>
    `;

    document.getElementById('add-medico').addEventListener('click', () => renderMedicoForm());
    await listarMedicos();
}

async function listarMedicos() {
    try {
        const response = await fetch(`${API_URL}/medicos`);
        const medicos = await response.json();

        const list = document.getElementById('medicos-list');
        list.innerHTML = '';

        medicos.forEach((medico) => {
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <h4>${medico.nombre} ${medico.apellido}</h4>
                <p><strong>Cédula:</strong> ${medico.cedula}</p>
                <p><strong>Correo:</strong> ${medico.correo}</p>
                <button class="edit-medico" data-id="${medico.id_medico}">Editar</button>
                <button class="delete-medico" data-id="${medico.id_medico}">Eliminar</button>
            `;
            list.appendChild(div);
        });

        document.querySelectorAll('.edit-medico').forEach((btn) => {
            btn.addEventListener('click', (e) => renderMedicoForm(e.target.dataset.id));
        });

        document.querySelectorAll('.delete-medico').forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                const medicoId = e.target.dataset.id;
                if (confirm('¿Estás seguro de eliminar este médico?')) {
                    await eliminarMedico(medicoId);
                }
            });
        });
    } catch (error) {
        console.error('Error al listar médicos:', error);
    }
}

function renderMedicoForm(medicoId = null) {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <h3>${medicoId ? 'Editar Médico' : 'Agregar Médico'}</h3>
        <form id="medico-form">
            <label>Nombre:</label>
            <input type="text" id="medico-nombre" required>
            <label>Apellido:</label>
            <input type="text" id="medico-apellido" required>
            <label>Cédula:</label>
            <input type="text" id="medico-cedula" required>
            <label>Correo:</label>
            <input type="email" id="medico-correo" required>
            <label>Ubicación del Consultorio:</label>
            <input type="text" id="medico-ubicacion" required>
            <button type="submit">${medicoId ? 'Actualizar' : 'Guardar'}</button>
        </form>
    `;

    if (medicoId) {
        cargarMedicoDatos(medicoId);
    }

    document.getElementById('medico-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const medicoData = {
            nombre: document.getElementById('medico-nombre').value,
            apellido: document.getElementById('medico-apellido').value,
            cedula: document.getElementById('medico-cedula').value,
            correo: document.getElementById('medico-correo').value,
            ubicacion_consultorio: document.getElementById('medico-ubicacion').value,
        };

        if (medicoId) {
            await actualizarMedico(medicoId, medicoData);
        } else {
            await crearMedico(medicoData);
        }
    });
}

async function cargarMedicoDatos(medicoId) {
    try {
        const response = await fetch(`${API_URL}/medicos/${medicoId}`);
        const medico = await response.json();

        document.getElementById('medico-nombre').value = medico.nombre;
        document.getElementById('medico-apellido').value = medico.apellido;
        document.getElementById('medico-cedula').value = medico.cedula;
        document.getElementById('medico-correo').value = medico.correo;
        document.getElementById('medico-ubicacion').value = medico.ubicacion_consultorio;
    } catch (error) {
        console.error('Error al cargar datos del médico:', error);
    }
}

async function crearMedico(medicoData) {
    try {
        const response = await fetch(`${API_URL}/medicos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medicoData),
        });

        if (response.ok) {
            alert('Médico creado exitosamente.');
            renderMedicosModule();
        } else {
            alert('Error al crear médico.');
        }
    } catch (error) {
        console.error('Error al crear médico:', error);
    }
}

async function actualizarMedico(medicoId, medicoData) {
    try {
        const response = await fetch(`${API_URL}/medicos/${medicoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medicoData),
        });

        if (response.ok) {
            alert('Médico actualizado exitosamente.');
            renderMedicosModule();
        } else {
            alert('Error al actualizar médico.');
        }
    } catch (error) {
        console.error('Error al actualizar médico:', error);
    }
}

async function eliminarMedico(medicoId) {
    try {
        const response = await fetch(`${API_URL}/medicos/${medicoId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Médico eliminado exitosamente.');
            renderMedicosModule();
        } else {
            alert('Error al eliminar médico.');
        }
    } catch (error) {
        console.error('Error al eliminar médico:', error);
    }
}

async function renderEspecialidadesModule() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <h3>Gestión de Especialidades</h3>
        <button id="add-especialidad">Agregar Especialidad</button>
        <div id="especialidades-list"></div>
    `;

    document.getElementById('add-especialidad').addEventListener('click', () => renderEspecialidadForm());
    await listarEspecialidades();
}

async function listarEspecialidades() {
    try {
        const response = await fetch(`${API_URL}/especialidades`);
        const especialidades = await response.json();

        const list = document.getElementById('especialidades-list');
        list.innerHTML = '';

        especialidades.forEach((especialidad) => {
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <h4>${especialidad.nombre}</h4>
                <p>${especialidad.descripcion}</p>
                <button class="edit-especialidad" data-id="${especialidad.id_especialidad}">Editar</button>
                <button class="delete-especialidad" data-id="${especialidad.id_especialidad}">Eliminar</button>
            `;
            list.appendChild(div);
        });

        document.querySelectorAll('.edit-especialidad').forEach((btn) => {
            btn.addEventListener('click', (e) => renderEspecialidadForm(e.target.dataset.id));
        });

        document.querySelectorAll('.delete-especialidad').forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                const especialidadId = e.target.dataset.id;
                if (confirm('¿Estás seguro de eliminar esta especialidad?')) {
                    await eliminarEspecialidad(especialidadId);
                }
            });
        });
    } catch (error) {
        console.error('Error al listar especialidades:', error);
    }
}

function renderEspecialidadForm(especialidadId = null) {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <h3>${especialidadId ? 'Editar Especialidad' : 'Agregar Especialidad'}</h3>
        <form id="especialidad-form">
            <label>Nombre:</label>
            <input type="text" id="especialidad-nombre" required>
            <label>Descripción:</label>
            <textarea id="especialidad-descripcion" required></textarea>
            <button type="submit">${especialidadId ? 'Actualizar' : 'Guardar'}</button>
        </form>
    `;

    if (especialidadId) {
        cargarEspecialidadDatos(especialidadId);
    }

    document.getElementById('especialidad-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const especialidadData = {
            nombre: document.getElementById('especialidad-nombre').value,
            descripcion: document.getElementById('especialidad-descripcion').value,
        };

        if (especialidadId) {
            await actualizarEspecialidad(especialidadId, especialidadData);
        } else {
            await crearEspecialidad(especialidadData);
        }
    });
}

async function cargarEspecialidadDatos(especialidadId) {
    try {
        const response = await fetch(`${API_URL}/especialidades/${especialidadId}`);
        const especialidad = await response.json();

        document.getElementById('especialidad-nombre').value = especialidad.nombre;
        document.getElementById('especialidad-descripcion').value = especialidad.descripcion;
    } catch (error) {
        console.error('Error al cargar datos de la especialidad:', error);
    }
}

async function crearEspecialidad(especialidadData) {
    try {
        const response = await fetch(`${API_URL}/especialidades`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(especialidadData),
        });

        if (response.ok) {
            alert('Especialidad creada exitosamente.');
            renderEspecialidadesModule();
        } else {
            alert('Error al crear especialidad.');
        }
    } catch (error) {
        console.error('Error al crear especialidad:', error);
    }
}

async function actualizarEspecialidad(especialidadId, especialidadData) {
    try {
        const response = await fetch(`${API_URL}/especialidades/${especialidadId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(especialidadData),
        });

        if (response.ok) {
            alert('Especialidad actualizada exitosamente.');
            renderEspecialidadesModule();
        } else {
            alert('Error al actualizar especialidad.');
        }
    } catch (error) {
        console.error('Error al actualizar especialidad:', error);
    }
}

async function eliminarEspecialidad(especialidadId) {
    try {
        const response = await fetch(`${API_URL}/especialidades/${especialidadId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Especialidad eliminada exitosamente.');
            renderEspecialidadesModule();
        } else {
            alert('Error al eliminar especialidad.');
        }
    } catch (error) {
        console.error('Error al eliminar especialidad:', error);
    }
}

async function renderHorariosModule() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <h3>Gestión de Horarios</h3>
        <button id="add-horario">Agregar Horario</button>
        <div id="horarios-list"></div>
    `;

    document.getElementById('add-horario').addEventListener('click', () => renderHorarioForm());
    await listarHorarios();
}

async function listarHorarios() {
    try {
        const response = await fetch(`${API_URL}/horarios`);
        const horarios = await response.json();

        const list = document.getElementById('horarios-list');
        list.innerHTML = '';

        horarios.forEach((horario) => {
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <p><strong>Médico ID:</strong> ${horario.medico_id}</p>
                <p><strong>Día:</strong> ${horario.dia_semana}</p>
                <p><strong>Inicio:</strong> ${horario.hora_inicio}</p>
                <p><strong>Fin:</strong> ${horario.hora_fin}</p>
                <button class="edit-horario" data-id="${horario.id_horario}">Editar</button>
                <button class="delete-horario" data-id="${horario.id_horario}">Eliminar</button>
            `;
            list.appendChild(div);
        });

        document.querySelectorAll('.edit-horario').forEach((btn) => {
            btn.addEventListener('click', (e) => renderHorarioForm(e.target.dataset.id));
        });

        document.querySelectorAll('.delete-horario').forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                const horarioId = e.target.dataset.id;
                if (confirm('¿Estás seguro de eliminar este horario?')) {
                    await eliminarHorario(horarioId);
                }
            });
        });
    } catch (error) {
        console.error('Error al listar horarios:', error);
    }
}

function renderHorarioForm(horarioId = null) {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <h3>${horarioId ? 'Editar Horario' : 'Agregar Horario'}</h3>
        <form id="horario-form">
            <label>Médico ID:</label>
            <input type="number" id="horario-medico-id" required>
            <label>Día de la Semana:</label>
            <input type="text" id="horario-dia" required>
            <label>Hora de Inicio:</label>
            <input type="time" id="horario-inicio" required>
            <label>Hora de Fin:</label>
            <input type="time" id="horario-fin" required>
            <button type="submit">${horarioId ? 'Actualizar' : 'Guardar'}</button>
        </form>
    `;

    if (horarioId) {
        cargarHorarioDatos(horarioId);
    }

    document.getElementById('horario-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const horarioData = {
            medico_id: document.getElementById('horario-medico-id').value,
            dia_semana: document.getElementById('horario-dia').value,
            hora_inicio: document.getElementById('horario-inicio').value,
            hora_fin: document.getElementById('horario-fin').value,
        };

        if (horarioId) {
            await actualizarHorario(horarioId, horarioData);
        } else {
            await crearHorario(horarioData);
        }
    });
}

async function cargarHorarioDatos(horarioId) {
    try {
        const response = await fetch(`${API_URL}/horarios/${horarioId}`);
        const horario = await response.json();

        document.getElementById('horario-medico-id').value = horario.medico_id;
        document.getElementById('horario-dia').value = horario.dia_semana;
        document.getElementById('horario-inicio').value = horario.hora_inicio;
        document.getElementById('horario-fin').value = horario.hora_fin;
    } catch (error) {
        console.error('Error al cargar datos del horario:', error);
    }
}

async function crearHorario(horarioData) {
    try {
        const response = await fetch(`${API_URL}/horarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(horarioData),
        });

        if (response.ok) {
            alert('Horario creado exitosamente.');
            renderHorariosModule();
        } else {
            alert('Error al crear horario.');
        }
    } catch (error) {
        console.error('Error al crear horario:', error);
    }
}

async function actualizarHorario(horarioId, horarioData) {
    try {
        const response = await fetch(`${API_URL}/horarios/${horarioId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(horarioData),
        });

        if (response.ok) {
            alert('Horario actualizado exitosamente.');
            renderHorariosModule();
        } else {
            alert('Error al actualizar horario.');
        }
    } catch (error) {
        console.error('Error al actualizar horario:', error);
    }
}

async function eliminarHorario(horarioId) {
    try {
        const response = await fetch(`${API_URL}/horarios/${horarioId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Horario eliminado exitosamente.');
            renderHorariosModule();
        } else {
            alert('Error al eliminar horario.');
        }
    } catch (error) {
        console.error('Error al eliminar horario:', error);
    }
}
