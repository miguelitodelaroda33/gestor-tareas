import Swal from 'sweetalert2';
import {
  obtenerTareas,
  obtenerTareaPorId,
  obtenerTareasCompletadas,
  obtenerTareasPendientes,
  obtenerTareasUrgentes,
  buscarTareas,
  eliminarTarea,
  obtenerProyectos,
  obtenerProyectoPorId,
  eliminarProyecto,
  crearTarea,
  actualizarTareaCompleta,
  cambiarEstadoTarea,
  marcarTareaUrgente,
  crearProyecto,
  actualizarProyectoCompleto,
  cambiarEstadoProyecto,
} from './services/api.js';
import { formatearFecha, mostrarAviso } from './utils/helpers.js';

const listaProyectos = document.getElementById('lista-proyectos');
const listaTareas = document.getElementById('lista-tareas');
const formProyecto = document.getElementById('form-proyecto');
const formTarea = document.getElementById('form-tarea');

// Cargar todo al abrir la pagina
cargarProyectos();
cargarTareas();

// ==========================================
// PROYECTOS
// ==========================================

async function cargarProyectos() {
  const proyectos = await obtenerProyectos();
  listaProyectos.innerHTML = '';

  for (let i = 0; i < proyectos.length; i++) {
    const proy = proyectos[i];
    const div = document.createElement('div');
    div.className = 'tarjeta';

    div.innerHTML = `
      <span class="${proy.activo ? '' : 'completada'}">
        <strong>${proy.nombre}</strong> (${proy.activo ? 'Activo' : 'Archivado'})
      </span>
      <div class="acciones">
        <button class="outline btn-ver-proy">Ver</button>
        <button class="secondary btn-estado-proy">${proy.activo ? 'Archivar' : 'Activar'}</button>
        <button class="outline btn-editar-proy">Editar</button>
        <button class="contrast btn-borrar-proy">X</button>
      </div>
    `;

    // Boton GET por ID
    div.querySelector('.btn-ver-proy').addEventListener('click', async () => {
      const info = await obtenerProyectoPorId(proy.id);
      Swal.fire({
        title: info.nombre,
        text: `ID: ${info.id} | Estado: ${info.activo ? 'Activo' : 'Archivado'}`,
      });
    });

    // Boton PATCH estado
    div.querySelector('.btn-estado-proy').addEventListener('click', async () => {
      await cambiarEstadoProyecto(proy.id, !proy.activo);
      mostrarAviso('Proyecto actualizado');
      cargarProyectos();
    });

    // Boton PUT editar
    div.querySelector('.btn-editar-proy').addEventListener('click', async () => {
      const resultado = await Swal.fire({
        title: 'Nuevo nombre',
        input: 'text',
        inputValue: proy.nombre,
        showCancelButton: true,
      });

      if (resultado.value) {
        await actualizarProyectoCompleto(proy.id, { nombre: resultado.value, activo: proy.activo });
        mostrarAviso('Nombre cambiado');
        cargarProyectos();
      }
    });

    // Boton DELETE borrar
    div.querySelector('.btn-borrar-proy').addEventListener('click', async () => {
      const alerta = await Swal.fire({
        title: '¿Borrar proyecto?',
        icon: 'warning',
        showCancelButton: true,
      });

      if (alerta.isConfirmed) {
        await eliminarProyecto(proy.id);
        mostrarAviso('Proyecto borrado');
        cargarProyectos();
      }
    });

    listaProyectos.appendChild(div);
  }
}

// Formulario POST proyecto
formProyecto.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputNombre = document.getElementById('input-proyecto');

  await crearProyecto({
    nombre: inputNombre.value,
    activo: true,
  });

  inputNombre.value = '';
  mostrarAviso('Proyecto creado');
  cargarProyectos();
});

// ==========================================
// TAREAS
// ==========================================

async function cargarTareas(listaCustom = null) {
  const tareas = listaCustom ? listaCustom : await obtenerTareas();
  listaTareas.innerHTML = '';

  if (!Array.isArray(tareas)) {
    listaTareas.innerHTML = '<p>No se encontraron tareas.</p>';
    return;
  }

  for (let i = 0; i < tareas.length; i++) {
    const tarea = tareas[i];
    const div = document.createElement('div');
    div.className = 'tarjeta';

    div.innerHTML = `
      <div>
        <strong class="${tarea.completada ? 'completada' : ''}">${tarea.titulo}</strong>
        <br />
        <small>Prioridad: ${tarea.prioridad} | Fecha: ${formatearFecha(tarea.fechaLimite)}</small>
      </div>
      <div class="acciones">
        <button class="btn-hecha">${tarea.completada ? 'Reabrir' : 'Hecha'}</button>
        <button class="secondary btn-urgente">Urgente</button>
        <button class="outline btn-editar">Editar</button>
        <button class="contrast btn-borrar">X</button>
      </div>
    `;

    // Boton PATCH completar
    div.querySelector('.btn-hecha').addEventListener('click', async () => {
      await cambiarEstadoTarea(tarea.id, !tarea.completada);
      mostrarAviso('Estado cambiado');
      cargarTareas();
    });

    // Boton PATCH urgente
    div.querySelector('.btn-urgente').addEventListener('click', async () => {
      await marcarTareaUrgente(tarea.id);
      mostrarAviso('Tarea urgente');
      cargarTareas();
    });

    // Boton GET por ID para editar
    div.querySelector('.btn-editar').addEventListener('click', async () => {
      const datosTarea = await obtenerTareaPorId(tarea.id);
      document.getElementById('tarea-id').value = datosTarea.id;
      document.getElementById('input-titulo').value = datosTarea.titulo;
      document.getElementById('select-prioridad').value = datosTarea.prioridad;
      document.getElementById('input-fecha').value = datosTarea.fechaLimite.split('T')[0];
      document.getElementById('btn-cancelar-edicion').classList.remove('hidden');
    });

    // Boton DELETE borrar
    div.querySelector('.btn-borrar').addEventListener('click', async () => {
      const alerta = await Swal.fire({
        title: '¿Eliminar tarea?',
        icon: 'warning',
        showCancelButton: true,
      });

      if (alerta.isConfirmed) {
        await eliminarTarea(tarea.id);
        mostrarAviso('Tarea eliminada');
        cargarTareas();
      }
    });

    listaTareas.appendChild(div);
  }
}

// Formulario POST y PUT tarea
formTarea.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('tarea-id').value;
  const datos = {
    titulo: document.getElementById('input-titulo').value,
    prioridad: document.getElementById('select-prioridad').value,
    fechaLimite: document.getElementById('input-fecha').value,
    completada: false,
  };

  if (id === '') {
    await crearTarea(datos);
    mostrarAviso('Tarea creada');
  } else {
    await actualizarTareaCompleta(id, datos);
    mostrarAviso('Tarea actualizada');
  }

  formTarea.reset();
  document.getElementById('tarea-id').value = '';
  document.getElementById('btn-cancelar-edicion').classList.add('hidden');
  cargarTareas();
});

// Boton cancelar edicion
document.getElementById('btn-cancelar-edicion').addEventListener('click', () => {
  formTarea.reset();
  document.getElementById('tarea-id').value = '';
  document.getElementById('btn-cancelar-edicion').classList.add('hidden');
});

// ==========================================
// FILTROS Y BUSCADOR
// ==========================================

document.getElementById('btn-todas').addEventListener('click', async () => {
  const lista = await obtenerTareas();
  cargarTareas(lista);
});

document.getElementById('btn-pendientes').addEventListener('click', async () => {
  const lista = await obtenerTareasPendientes();
  cargarTareas(lista);
});

document.getElementById('btn-completadas').addEventListener('click', async () => {
  const lista = await obtenerTareasCompletadas();
  cargarTareas(lista);
});

document.getElementById('btn-urgentes').addEventListener('click', async () => {
  const lista = await obtenerTareasUrgentes();
  cargarTareas(lista);
});

document.getElementById('input-buscar').addEventListener('input', async (e) => {
  const texto = e.target.value;
  if (texto === '') {
    cargarTareas();
  } else {
    const lista = await buscarTareas(texto);
    cargarTareas(lista);
  }
});