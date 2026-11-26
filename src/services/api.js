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
  if (!res.ok) return [];
  const datos = await res.json();
  return Array.isArray(datos) ? datos : [];
}

// 4. GET tareas pendientes
export async function obtenerTareasPendientes() {
  const res = await fetch(`${URL_API}/tareas?completada=false`);
  if (!res.ok) return [];
  const datos = await res.json();
  return Array.isArray(datos) ? datos : [];
}

// 5. GET tareas urgentes (prioridad alta y que no esten hechas)
export async function obtenerTareasUrgentes() {
  const res = await fetch(`${URL_API}/tareas?prioridad=alta`);
  if (!res.ok) return [];
  const datos = await res.json();
  if (!Array.isArray(datos)) return [];

  const soloPendientesUrgentes = [];
  for (let i = 0; i < datos.length; i++) {
    if (!datos[i].completada) {
      soloPendientesUrgentes.push(datos[i]);
    }
  }
  return soloPendientesUrgentes;
}

// 6. GET buscar tareas por titulo
export async function buscarTareas(texto) {
  const res = await fetch(`${URL_API}/tareas?titulo=${texto}`);
  if (!res.ok) return [];
  const datos = await res.json();
  return Array.isArray(datos) ? datos : [];
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
  try {
    await fetch(`${URL_API}/tareas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completada: estado }),
    });
  } catch (e) {
    // Si MockAPI bloquea PATCH por CORS, continuamos con PUT
  }

  const res = await fetch(`${URL_API}/tareas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completada: estado }),
  });
  return await res.json();
}

// 4. PATCH cambiar prioridad a alta
export async function marcarTareaUrgente(id) {
  try {
    await fetch(`${URL_API}/tareas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prioridad: 'alta' }),
    });
  } catch (e) {
    // Si MockAPI bloquea PATCH por CORS, continuamos con PUT
  }

  const res = await fetch(`${URL_API}/tareas/${id}`, {
    method: 'PUT',
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
  try {
    await fetch(`${URL_API}/proyectos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activo: activo }),
    });
  } catch (e) {
    // Si MockAPI bloquea PATCH por CORS, continuamos con PUT
  }

  const res = await fetch(`${URL_API}/proyectos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ activo: activo }),
  });
  return await res.json();
}