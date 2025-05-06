# 🧠 PsicoVirtualAI

<div align="center">
  
  ![Logo](https://placehold.co/600x200?text=PsicoVirtualAI&font=montserrat)
  
  ### Plataforma de Acompañamiento Psicológico Virtual potenciado por IA
  
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.3-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/express.js-%23000000.svg?style=for-the-badge&logo=express&logoColor=%23FFF)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
  [![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow?style=for-the-badge)](https://github.com/yourusername/psicovirtualai)
  [![Licencia](https://img.shields.io/badge/Licencia-MIT-blue?style=for-the-badge)](LICENSE)
  
</div>

## 📋 Contenido

- [✨ Características](#-características)
- [🔍 Vista Previa](#-vista-previa)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [📚 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [🛠️ Uso](#️-uso)
- [💾 Modelo de Datos](#-modelo-de-datos)
- [🔌 API Endpoints](#-api-endpoints)
- [👥 Equipo](#-equipo)
- [🔮 Próximos Pasos](#-próximos-pasos)
- [🤝 Contribución](#-contribución)
- [📝 Licencia](#-licencia)

## ✨ Características

### Para Usuarios
- **🔐 Registro inteligente multietapa** - Formulario intuitivo de datos demográficos, vivienda, educación, situación laboral y salud
- **💬 Chatbot psicológico avanzado** - Asistente IA especializado en apoyo emocional y escucha activa
- **📊 Tests psicológicos interactivos** - Evaluaciones estructuradas (GHQ-12, DEPS, ANS, ESTR, SUIC, CALVIDA) con análisis automático
- **🔊 Interfaz conversacional por voz** - Respuestas por texto a voz para mayor accesibilidad
- **📱 Diseño adaptable** - Experiencia óptima en dispositivos móviles y de escritorio
- **📜 Historial completo** - Acceso y gestión de conversaciones anteriores

### Para Administradores
- **🔍 Panel de control** - Búsqueda y monitoreo de usuarios registrados
- **👁️ Consulta detallada** - Visualización completa de información de usuarios
- **🔒 Acceso seguro** - Sistema de permisos basado en roles

## 🔍 Vista Previa

<div align="center">
  <img src="https://placehold.co/800x400?text=Captura+de+pantalla+1" width="45%" alt="Captura 1"/>
  <img src="https://placehold.co/800x400?text=Captura+de+pantalla+2" width="45%" alt="Captura 2"/>
</div>

<details>
<summary>Ver más capturas</summary>
<div align="center">
  <img src="https://placehold.co/800x400?text=Captura+de+pantalla+3" width="30%" alt="Captura 3"/>
  <img src="https://placehold.co/800x400?text=Captura+de+pantalla+4" width="30%" alt="Captura 4"/>
  <img src="https://placehold.co/800x400?text=Captura+de+pantalla+5" width="30%" alt="Captura 5"/>
</div>
</details>

## 🏗️ Arquitectura del Sistema

PsicoVirtualAI está construido siguiendo una arquitectura cliente-servidor moderna con una clara separación entre el frontend y el backend:

```mermaid
graph TD
    A[Usuario] --> B[Frontend: React]
    B <--> C[Backend: Node.js + Express]
    C <--> D[(Base de Datos: MySQL)]
    C <--> E[Servicios de IA]
    C <--> F[Servicios de TTS]
    
    subgraph "Cliente"
    B --- B1[Páginas]
    B1 --- B2[Componentes]
    end
    
    subgraph "Servidor"
    C --- C1[API REST]
    C1 --- C2[Controladores]
    C1 --- C3[Prisma ORM]
    end
```

### Tecnologías Utilizadas

| Frontend | Backend | Base de Datos | Desarrollo |
|----------|---------|--------------|------------|
| React | Node.js | MySQL | Vite |
| React Router DOM v6 | Express | Prisma ORM | ESLint |
| Axios | CORS | Migraciones | Git |
| js-cookie | API REST | | npm/yarn |
| Tailwind CSS | | | PostCSS |
| Lucide Icons | | | |

## 📚 Estructura del Proyecto

El proyecto está organizado en dos directorios principales: `frontend` y `backend`:

### Frontend

```
📦 frontend
 ┣ 📂 public
 ┃ ┣ 📜 BotIcon.png
 ┃ ┣ 📜 FlechaDerecha.png
 ┃ ┣ 📜 FlechaIzquierda.png
 ┃ ┣ 📜 NuevoChat.png
 ┃ ┣ 📜 NuevoChatAzul.png
 ┃ ┣ 📜 iconEnviar.png
 ┃ ┗ 📜 basura.png
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 Css.css
 ┃ ┃ ┣ 📜 ChatContainer.js
 ┃ ┃ ┣ 📜 MsgIA.js
 ┃ ┃ ┣ 📜 MsgUser.js
 ┃ ┃ ┣ 📜 Prompts.js
 ┃ ┃ ┗ 📜 steps.js
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 Admin.jsx
 ┃ ┃ ┣ 📜 Chat.jsx
 ┃ ┃ ┣ 📜 EditDatos.jsx
 ┃ ┃ ┣ 📜 Register.jsx
 ┃ ┃ ┗ 📜 Start.jsx
 ┃ ┣ 📂 routes
 ┃ ┃ ┗ 📜 AppRouter.jsx
 ┃ ┣ 📜 App.jsx
 ┃ ┗ 📜 index.css
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 eslint.config.js
 ┣ 📜 package.json
 ┣ 📜 postcss.config.js
 ┣ 📜 tailwind.config.js
 ┗ 📜 vite.config.js
```

### Backend

```
📦 backend
 ┣ 📂 controllers
 ┃ ┣ 📜 AdminConsultaUser.js
 ┃ ┣ 📜 AllChats.js
 ┃ ┣ 📜 CargarChat.js
 ┃ ┣ 📜 DeleteChat.js
 ┃ ┣ 📜 Login.js
 ┃ ┣ 📜 RegistroUser.js
 ┃ ┣ 📜 StringToMp3.js
 ┃ ┗ 📜 UpdateUser.js
 ┣ 📂 controllersAI
 ┃ ┗ 📜 ChatAI.js
 ┣ 📂 prisma
 ┃ ┣ 📂 migrations
 ┃ ┃ ┗ 📂 20250430192443_init
 ┃ ┃   ┗ 📜 migration.sql
 ┃ ┗ 📜 schema.prisma
 ┣ 📂 Router
 ┃ ┣ 📜 AdminConsultasUserRouter.js
 ┃ ┣ 📜 AllChatsRouter.js
 ┃ ┣ 📜 CargarChatRouter.js
 ┃ ┣ 📜 ChatAIRouter.js
 ┃ ┣ 📜 chatsaveRouter.js
 ┃ ┣ 📜 DeleteChatRouter.js
 ┃ ┣ 📜 LoginRouter.js
 ┃ ┣ 📜 RegistroUserRouter.js
 ┃ ┣ 📜 Routes.js
 ┃ ┣ 📜 StringToMp3Router.js
 ┃ ┗ 📜 UpdateUserRouter.js
 ┣ 📜 .env
 ┣ 📜 app.js
 ┣ 📜 package.json
 ┗ 📜 server.js
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v16.0.0 o superior)
- npm o yarn
- MySQL Server

### Configuración de la Base de Datos

1. Crea una base de datos MySQL para el proyecto:

```sql
CREATE DATABASE psicovirtual_db;
```

2. Configura las credenciales de acceso en el archivo `.env` del backend.

### Instalación del Backend

1. **Clonar el repositorio**

```bash
git clone https://github.com/yourusername/psicovirtualai.git
cd psicovirtualai/backend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del directorio backend:

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/psicovirtual_db"
PORT=5000
# Otras variables específicas para servicios de IA o texto a voz
```

4. **Ejecutar migraciones de Prisma**

```bash
npx prisma migrate dev
```

5. **Iniciar el servidor backend**

```bash
npm run dev
```

🌐 El servidor backend estará disponible en [http://localhost:5000](http://localhost:5000)

### Instalación del Frontend

1. **Navegar al directorio del frontend**

```bash
cd ../frontend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del directorio frontend:

```env
VITE_URL=http://localhost:5000
```

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

🌐 La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

## 🛠️ Uso

### Flujos de Usuario

#### 👤 Usuario Regular

1. **Registro**: Completa el formulario multietapa con datos personales, vivienda, educación, situación laboral y salud
2. **Iniciar sesión**: Accede con tus credenciales
3. **Chat**: Interactúa con el asistente virtual para obtener apoyo psicológico
4. **Tests**: Realiza evaluaciones psicológicas guiadas por el asistente
5. **Gestión de datos**: Actualiza tu información personal cuando sea necesario

#### 👑 Administrador

1. **Acceso al panel**: Ingresa con credenciales de administrador
2. **Búsqueda de usuarios**: Localiza usuarios por ID, correo o documento
3. **Consulta de datos**: Visualiza información detallada de los usuarios

### Comandos Disponibles

#### Frontend

```bash
# Desarrollo con recarga en caliente
npm run dev

# Compilar para producción
npm run build

# Vista previa de la versión de producción
npm run preview

# Ejecutar linter
npm run lint
```

#### Backend

```bash
# Desarrollo con nodemon
npm run dev

# Iniciar en modo producción
npm start

# Generar nuevas migraciones de Prisma
npx prisma migrate dev --name nombre_migracion
```

## 💾 Modelo de Datos

La aplicación utiliza varias entidades para almacenar la información de usuarios y sus interacciones:

### Principales Entidades

- **Información de Usuario**: Datos básicos del usuario registrado
- **Credenciales**: Información de autenticación
- **Chats**: Historial de conversaciones con el asistente
- **Información Sociodemográfica**: Dividida en varias tablas:
  - Información Personal
  - Condiciones de Vivienda
  - Educación
  - Situación Laboral
  - Salud
- **Tests Psicológicos**: Resultados de los diferentes cuestionarios:
  - GHQ-12 (Cuestionario de Salud General)
  - DEP (Depresión)
  - ANS (Ansiedad)
  - ESTR (Estrés)
  - SUIC (Riesgo Suicida)
  - CALVIDA (Calidad de Vida)

### Diagrama Simplificado

```mermaid
erDiagram
    informacionUsuario ||--o{ chats : tiene
    informacionUsuario ||--|| credencial : posee
    informacionUsuario ||--|| informacionPersonal : contiene
    informacionUsuario ||--|| condicionesvivienda : registra
    informacionUsuario ||--|| educacion : tiene
    informacionUsuario ||--|| situacionlaboral : documenta
    informacionUsuario ||--|| salud : incluye
    informacionUsuario ||--o{ ghq12 : evalua
    informacionUsuario ||--o{ dep : evalua
    informacionUsuario ||--o{ ans : evalua
    informacionUsuario ||--o{ estr : evalua
    informacionUsuario ||--o{ suic : evalua
    informacionUsuario ||--o{ calvida : evalua
```

## 🔌 API Endpoints

| Método | Ruta                     | Descripción                                 |
|--------|--------------------------|---------------------------------------------|
| POST   | `/psicologia/login`      | Autenticación de usuarios                   |
| POST   | `/psicologia/RegistroUser` | Registro de nuevos usuarios                 |
| PUT    | `/psicologia/updateUser` | Actualización de información de usuarios    |
| GET    | `/psicologia/ConsultaUser` | Consulta de datos de un usuario específico |
| POST   | `/psicologia/ChatAI`     | Interacción con el asistente de IA          |
| POST   | `/psicologia/AllChats`   | Obtención de todos los chats de un usuario  |
| POST   | `/psicologia/CargarChat` | Carga de un chat específico                 |
| POST   | `/psicologia/ChatSave`   | Guardar una conversación de chat            |
| DELETE | `/psicologia/delete-chat` | Eliminación de un chat                      |
| POST   | `/psicologia/StrToMp3`   | Conversión de texto a voz                   |

## 👥 Equipo

Desarrollado con ❤️ por el grupo **Valle del Software** de la **Universitaria de Colombia**

<div align="center">
  <table>
    <tr>
      <td align="center"><a href="#"><img src="https://placehold.co/150x150?text=Dev+1" width="100px"><br><sub><b>Nombre Dev 1</b></sub></a></td>
      <td align="center"><a href="#"><img src="https://placehold.co/150x150?text=Dev+2" width="100px"><br><sub><b>Nombre Dev 2</b></sub></a></td>
      <td align="center"><a href="#"><img src="https://placehold.co/150x150?text=Dev+3" width="100px"><br><sub><b>Nombre Dev 3</b></sub></a></td>
    </tr>
  </table>
</div>

## 🔮 Próximos Pasos

- **Seguridad**
  - Implementación de autenticación JWT
  - Mejoras en la seguridad y validación de la API
  
- **Funcionalidades**
  - Ampliación de las capacidades del asistente de IA
  - Implementación de reportes estadísticos para administradores
  - Mejoras en la accesibilidad de la interfaz
  
- **Infraestructura**
  - Configuración para despliegue en producción
  - Sistema de logging para monitorización
  - Pruebas automatizadas

## 🤝 Contribución

¡Nos encantaría recibir tu ayuda para mejorar PsicoVirtualAI! Para contribuir:

1. Haz fork del repositorio
2. Crea una rama para tu función: `git checkout -b feature/nueva-funcion`
3. Realiza tus cambios y haz commit: `git commit -m 'Añadir nueva función'`
4. Sube tus cambios: `git push origin feature/nueva-funcion`
5. Envía un Pull Request

Por favor, asegúrate de seguir nuestras [pautas de contribución](CONTRIBUTING.md) y el [código de conducta](CODE_OF_CONDUCT.md).

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  <p>
    <a href="https://github.com/yourusername/psicovirtualai/issues">Reportar un problema</a> •
    <a href="https://github.com/yourusername/psicovirtualai/discussions">Discusiones</a> •
    <a href="mailto:contacto@ejemplo.com">Contacto</a>
  </p>
  
  <p>© 2025 Valle del Software - Universitaria de Colombia</p>
</div>