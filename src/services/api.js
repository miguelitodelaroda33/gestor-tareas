const URL_API = 'https://6b07eeb958419b87a438d992.mockapi.io';

// ==========================================
// 10 PETICIONES SIN BODY (GET y DELETE)
// ==========================================

// 1. GET todas las tareas
export async function obtenerTareas() {
  const res = await fetch(`${URL_API}/tareas`);
  return await res.json();
}

// 2. GET una tarea por ID
export async function obtenerTareaPorId(id) {
  const res = await fetch(`${URL_API}/tareas/${id}`);
  return await res.json();
}

// 3. GET tareas completadas
export async function obtenerTareasCompletadas() {
  const res = await fetch(`${URL_API}/tareas?completada=true`);
  return await res.json();
}

// 4. GET tareas pendientes
export async function obtenerTareasPendientes() {
  const res = await fetch(`${URL_API}/tareas?completada=false`);
  return await res.json();
}

// 5. GET tareas urgentes
export async function obtenerTareasUrgentes() {
  const res = await fetch(`${URL_API}/tareas?prioridad=alta`);
  return await res.json();
}

// 6. GET buscar tareas por titulo
export async function buscarTareas(texto) {
  const res = await fetch(`${URL_API}/tareas?titulo=${texto}`);
  return await res.json();
}

// 7. DELETE borrar tarea
export async function eliminarTarea(id) {
  const res = await fetch(`${URL_API}/tareas/${id}`, {
    method: 'DELETE',
  });
  return await res.json();
}

// 8. GET todos los proyectos
export async function obtenerProyectos() {
  const res = await fetch(`${URL_API}/proyectos`);
  return await res.json();
}

// 9. GET un proyecto por ID
export async function obtenerProyectoPorId(id) {
  const res = await fetch(`${URL_API}/proyectos/${id}`);
  return await res.json();
}

// 10. DELETE borrar proyecto
export async function eliminarProyecto(id) {
  const res = await fetch(`${URL_API}/proyectos/${id}`, {
    method: 'DELETE',
  });
  return await res.json();
}

// ==========================================
// 7 PETICIONES CON BODY (POST, PUT y PATCH)
// ==========================================

// 1. POST crear tarea
export async function crearTarea(nuevaTarea) {
  const res = await fetch(`${URL_API}/tareas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevaTarea),
  });
  return await res.json();
}

// 2. PUT editar tarea entera
export async function actualizarTareaCompleta(id, tareaEditada) {
  const res = await fetch(`${URL_API}/tareas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tareaEditada),
  });
  return await res.json();
}

// 3. PATCH marcar tarea hecha o pendiente
export async function cambiarEstadoTarea(id, estado) {
  const res = await fetch(`${URL_API}/tareas/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completada: estado }),
  });
  return await res.json();
}

// 4. PATCH cambiar prioridad a alta
export async function marcarTareaUrgente(id) {
  const res = await fetch(`${URL_API}/tareas/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prioridad: 'alta' }),
  });
  return await res.json();
}

// 5. POST crear proyecto
export async function crearProyecto(nuevoProyecto) {
  const res = await fetch(`${URL_API}/proyectos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoProyecto),
  });
  return await res.json();
}

// 6. PUT editar proyecto entero
export async function actualizarProyectoCompleto(id, proyectoEditado) {
  const res = await fetch(`${URL_API}/proyectos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proyectoEditado),
  });
  return await res.json();
}

// 7. PATCH activar o archivar proyecto
export async function cambiarEstadoProyecto(id, activo) {
  const res = await fetch(`${URL_API}/proyectos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ activo: activo }),
  });
  return await res.json();
}