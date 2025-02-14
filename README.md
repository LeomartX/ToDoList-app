Proyecto de Gestión de Tareas
Este proyecto es una aplicación móvil desarrollada con React Native para gestionar tareas pendientes y completadas. Los usuarios pueden agregar, editar, eliminar y marcar tareas como completadas. La aplicación se conecta a un backend API para almacenar y obtener las tareas.

Requisitos
Antes de comenzar, asegúrate de tener instalados los siguientes programas:

Node.js (preferentemente la versión LTS).
Expo CLI.
React Native.
Un emulador de Android/iOS o un dispositivo físico para probar la aplicación.
Instalación
Clona el repositorio:

bash
Copy
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio
Instala las dependencias:

bash
Copy
npm install
Si necesitas configurar un servidor backend, asegúrate de tener la API corriendo en http://tuIP:84/api/tasks o la URL correspondiente.

Ejecuta la aplicación en un emulador o dispositivo físico:

bash
Copy
npx expo start
Estructura del Proyecto
El proyecto está compuesto por los siguientes componentes principales:

TaskForm: Componente para crear y editar tareas.
TaskItem: Componente que representa una tarea individual con opciones para editar, eliminar y cambiar su estado.
TaskList: Componente que muestra una lista de tareas.
TaskContext: Contexto que maneja el estado global de las tareas y las interacciones con la API.
PendingTasks: Vista de las tareas pendientes.
CompletedTasks: Vista de las tareas completadas.
Navigation: Configuración de la navegación entre las vistas de tareas pendientes y completadas.
Funcionalidades
Tareas Pendientes
En la sección de "Tareas Pendientes" puedes:

Agregar nuevas tareas: Usa el formulario para crear tareas.
Editar tareas: Puedes actualizar el título y la descripción de una tarea.
Eliminar tareas: Elimina tareas de la lista.
Marcar tareas como completadas: Cambia el estado de la tarea a "Completada".
Tareas Completadas
En la sección de "Tareas Completadas" puedes:

Ver las tareas que ya han sido completadas.
No se pueden editar ni eliminar las tareas completadas en esta sección, solo visualizar.
Componentes
TaskForm: Este formulario permite a los usuarios crear y editar tareas. Tiene validaciones para asegurarse de que tanto el título como la descripción sean completados.

TaskItem: Cada tarea se muestra con su título y descripción. Además, tiene botones para editar, eliminar y marcar la tarea como completada o pendiente.

TaskList: Este componente muestra una lista de tareas. Puede manejar la edición, eliminación y cambio de estado de las tareas.

TaskContext: Es el contexto que maneja el estado global de las tareas. Usa un reducer para manejar las acciones como agregar, editar, eliminar y cambiar el estado de las tareas.

API
La aplicación se conecta a una API REST que permite realizar operaciones CRUD sobre las tareas. Los endpoints principales son:

GET /api/tasks: Obtener todas las tareas.
POST /api/tasks: Crear una nueva tarea.
PUT /api/tasks/:id: Actualizar una tarea existente.
DELETE /api/tasks/:id: Eliminar una tarea.
