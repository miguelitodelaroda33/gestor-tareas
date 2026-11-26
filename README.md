# Gestor de Tareas y Proyectos

Aplicación web desarrollada con **Vite** y **JavaScript (Vanilla)** para gestionar proyectos y tareas mediante operaciones CRUD completas contra una API REST externa (MockAPI.io).

## Instalación y ejecución

1. Clonar el repositorio e instalar las dependencias:
   ```bash
   npm install
   Arrancar el servidor de desarrollo
   npm run dev

## Librerías externas utilizadas (NPM)

Para cumplir con la gestión de dependencias (sin utilizar `axios` ni `react`), se han integrado 3 librerías con funcionalidad real en la aplicación:

1. **`sweetalert2`**: Se utiliza para mostrar ventanas modales interactivas y confirmaciones antes de realizar acciones destructivas (eliminar un proyecto o una tarea), así como cuadros de diálogo con inputs para editar el nombre de un proyecto o visualizar su información.
   - Comando utilizado para instalar la librería: `npm install sweetalert2`

2. **`toastify-js`**: Proporciona notificaciones visuales flotantes (tipo *toast*) en la esquina de la pantalla para dar feedback inmediato al usuario cada vez que se crea, actualiza, archiva o elimina un registro.
   - Comando utilizado para instalar la librería: `npm install toastify-js`

3. **`dayjs`**: Se encarga de parsear las fechas en formato ISO procedentes de la API y formatearlas a un formato legible (`DD/MM/YYYY`) en las tarjetas de cada tarea.
   - Comando utilizado para instalar la librería: `npm install dayjs`

## Estructura del proyecto
index.html: Estructura principal de la interfaz con PicoCSS.

src/style.css: Estilos personalizados para tarjetas, estados completados y botones de acción.

src/services/api.js: Capa de acceso a datos con las 17 peticiones fetch (GET, POST, PUT, PATCH y DELETE).

src/utils/helpers.js: Funciones auxiliares para formateo de fechas con Day.js y avisos con Toastify.

src/main.js: Lógica principal, manejo del DOM y eventos de formularios, filtros y buscador.

Endpoints implementados (17 peticiones)
Peticiones sin body (10)
GET /tareas: Obtener el listado completo de tareas.

GET /tareas/:id: Obtener el detalle de una tarea para cargarla en el formulario de edición.

GET /tareas?completada=true: Filtrar tareas completadas.

GET /tareas?completada=false: Filtrar tareas pendientes.

GET /tareas?prioridad=alta: Filtrar tareas urgentes.

GET /tareas?titulo=...: Buscar tareas por texto en el título.

DELETE /tareas/:id: Eliminar una tarea.

GET /proyectos: Obtener todos los proyectos.

GET /proyectos/:id: Consultar los datos de un proyecto concreto.

DELETE /proyectos/:id: Eliminar un proyecto.

Peticiones con body (7)
POST /tareas: Crear una nueva tarea.

PUT /tareas/:id: Actualizar todos los campos de una tarea existente.

PATCH /tareas/:id: Cambiar el estado (completada) de una tarea.

PATCH /tareas/:id: Cambiar la prioridad de una tarea a alta.

POST /proyectos: Crear un nuevo proyecto.

PUT /proyectos/:id: Modificar el nombre completo de un proyecto.

PATCH /proyectos/:id: Activar o archivar un proyecto (activo).
