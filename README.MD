# Backend de la Aplicación de Psicología

[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express.js-%23000000.svg?style=for-the-badge&logo=express&logoColor=%23FFF)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![CORS](https://img.shields.io/badge/CORS-white?style=for-the-badge&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

Este repositorio contiene el backend de una aplicación de psicología diseñada para ofrecer diversas funcionalidades, incluyendo la interacción con un asistente psicológico basado en inteligencia artificial, el registro y la gestión de usuarios, el almacenamiento de historiales de chat, la recopilación de información sociodemográfica y la administración de cuestionarios psicológicos estandarizados.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración del Servidor](#configuración-del-servidor)
  - [Archivo `server.js`](#archivo-serverjs)
  - [Archivo `app.js`](#archivo-appjs)
- [Rutas de la API (`/psicologia/`)](#rutas-de-la-api-psicologia)
- [Controladores](#controladores)
  - [Controladores Principales](#controladores-principales)
  - [Controladores de IA](#controladores-de-ia)
- [Modelo de Datos (Esquema de Prisma)](#modelo-de-datos-esquema-de-prisma)
  - [`informacionUsuario`](#informacionusuario)
  - [`chats`](#chats)
  - [`credencial`](#credencial)
  - [`informacionPersonal`](#informacionpersonal)
  - [`condicionesvivienda`](#condicionesvivienda)
  - [`educacion`](#educacion)
  - [`situacionlaboral`](#situacionlaboral)
  - [`salud`](#salud)
  - [`ghq12`](#ghq12)
  - [`dep`](#dep)
  - [`ans`](#ans)
  - [`estr`](#estr)
  - [`suic`](#suic)
  - [`calvida`](#calvida)
- [Migraciones de la Base de Datos](#migraciones-de-la-base-de-datos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Variables de Entorno](#variables-de-entorno)
- [Ejecución del Servidor](#ejecución-del-servidor)
- [Próximos Pasos](#próximos-pasos)
- [Consideraciones Adicionales](#consideraciones-adicionales)
- [Licencia](#licencia)

## Descripción General

El backend de esta aplicación se fundamenta en una arquitectura RESTful, utilizando Node.js con el framework Express para la construcción de las APIs. La persistencia de los datos se logra mediante una base de datos MySQL, cuya interacción se gestiona de manera eficiente y segura a través del ORM Prisma. El uso de CORS permite la comunicación fluida con el frontend, que podría estar alojado en un dominio diferente.

Este backend proporciona las funcionalidades esenciales para la gestión de usuarios (registro, inicio de sesión, actualización), la interacción con un sistema de chat inteligente (envío y recepción de mensajes, almacenamiento del historial), la recopilación y el almacenamiento de datos sociodemográficos relevantes para el contexto psicológico, y la administración de la aplicación de cuestionarios psicológicos estandarizados, junto con el almacenamiento de sus resultados. Adicionalmente, se incluye una funcionalidad para la conversión de texto a voz, lo que podría mejorar la accesibilidad de la aplicación. La lógica de cada una de las rutas de la API se encuentra implementada en los archivos dentro del directorio `Backend/controllers/`. La lógica específica del asistente de inteligencia artificial se encuentra en `Backend/controllersAI/ChatAI.js`.

## Tecnologías Utilizadas

- **Node.js:** El entorno de ejecución del lado del servidor que permite la ejecución de código JavaScript.
- **Express:** Un framework web minimalista y flexible para Node.js, utilizado para construir la API RESTful.
- **CORS (Cross-Origin Resource Sharing):** Un mecanismo basado en encabezados HTTP que permite a un servidor indicar cualquier origen (dominio, esquema o puerto) distinto de su propio origen desde el que un navegador debe permitir la carga de recursos.
- **Prisma:** Un ORM de nueva generación para Node.js y TypeScript que facilita la interacción con la base de datos de manera intuitiva y segura, ofreciendo autocompletado, seguridad de tipos y una API clara.
- **MySQL:** Un sistema de gestión de bases de datos relacional (RDBMS) ampliamente utilizado para el almacenamiento y la gestión de los datos de la aplicación.

## Estructura del Proyecto

```
backend/
├── app.js             # Configuración principal de la aplicación Express
├── controllers/       # Contiene la lógica de las rutas de la API
│   ├── AdminConsultaUser.js
│   ├── AllChats.js
│   ├── CargarChat.js
│   ├── DeleteChat.js
│   ├── Login.js
│   ├── RegistroUser.js
│   ├── StringToMp3.js
│   └── UpdateUser.js
├── controllersAI/     # Contiene la lógica del asistente de IA
│   └── ChatAI.js
├── prisma/            # Configuración y archivos relacionados con Prisma
│   ├── schema.prisma    # Definición del esquema de la base de datos
│   └── migrations/    # Contiene los archivos de migración de la base de datos
│       └── 20250430192443_init/
│           └── migration.sql
├── Router/            # Contiene las definiciones de las rutas de la API
│   └── Routes.js
├── server.js          # Punto de entrada para iniciar el servidor
├── package.json       # Archivo de metadatos del proyecto y dependencias
├── package-lock.json  # Registro exacto de las dependencias instaladas
└── .env               # Archivo para variables de entorno (ej. URL de la base de datos)
```

## Configuración del Servidor

### Archivo `server.js`

Este archivo es el punto de entrada principal para iniciar el servidor backend. Importa la aplicación Express configurada en `app.js` y la pone a escuchar en un puerto específico.

```javascript
import app from "./app.js";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Archivo `app.js`

Este archivo configura la aplicación Express, estableciendo middlewares como CORS, parsers para JSON y datos codificados en URL, y definiendo las rutas principales de la API.

```javascript
import express from "express";
import cors from "cors";
import routes from "./Router/Routes.js";

const app = express();

// Configuración de middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de rutas
app.use("/psicologia", routes);

export default app;
```

## Rutas de la API (`/psicologia/`)

Las rutas API del backend están definidas en el archivo `Router/Routes.js` y son accesibles mediante el prefijo `/psicologia/`. A continuación se detallan las principales rutas:

| Método | Ruta                   | Descripción                                |
| ------ | ---------------------- | ------------------------------------------ |
| POST   | `/login`               | Autenticación de usuarios                  |
| POST   | `/registro`            | Registro de nuevos usuarios                |
| PUT    | `/updateuser`          | Actualización de información de usuarios   |
| GET    | `/admin/users`         | Consulta de usuarios (admin)               |
| POST   | `/chat/ai`             | Interacción con el asistente de IA         |
| GET    | `/chat/all/:userId`    | Obtención de todos los chats de un usuario |
| GET    | `/chat/load/:chatId`   | Carga de un chat específico                |
| DELETE | `/chat/delete/:chatId` | Eliminación de un chat                     |
| POST   | `/tts`                 | Conversión de texto a voz                  |

## Controladores

### Controladores Principales

Los controladores en la carpeta `controllers/` manejan la lógica de negocio para cada ruta de la API:

- **AdminConsultaUser.js**: Gestiona las consultas administrativas sobre usuarios.
- **AllChats.js**: Recupera todos los chats asociados a un usuario.
- **CargarChat.js**: Carga un chat específico con su historial de mensajes.
- **DeleteChat.js**: Elimina un chat y sus mensajes asociados.
- **Login.js**: Maneja la autenticación de usuarios.
- **RegistroUser.js**: Procesa el registro de nuevos usuarios.
- **StringToMp3.js**: Convierte texto a formato de audio.
- **UpdateUser.js**: Actualiza la información de un usuario existente.

### Controladores de IA

La carpeta `controllersAI/` contiene los controladores relacionados con la funcionalidad de inteligencia artificial:

- **ChatAI.js**: Implementa la lógica del asistente de psicología basado en IA, procesando las entradas del usuario y generando respuestas apropiadas.

## Modelo de Datos (Esquema de Prisma)

El esquema de Prisma define la estructura de la base de datos. A continuación se detallan las principales entidades:

### `informacionUsuario`

Almacena la información básica de los usuarios registrados en la plataforma.

```prisma
model informacionUsuario {
  id        Int      @id @default(autoincrement())
  nombre    String
  apellido  String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relaciones
  credencial credencial?
  chats      chats[]
  // Otras relaciones con tablas de información sociodemográfica y cuestionarios
}
```

### `chats`

Registra los chats entre los usuarios y el asistente de IA.

```prisma
model chats {
  id            Int      @id @default(autoincrement())
  nombreChat    String
  fechaCreacion DateTime @default(now())
  historial     Json     // Almacena el historial de mensajes en formato JSON
  userId        Int      // Referencia al usuario propietario del chat

  // Relación con el usuario
  usuario       informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `credencial`

Almacena las credenciales de autenticación de los usuarios.

```prisma
model credencial {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String // Almacenada con hash
  userId   Int    @unique

  // Relación con el usuario
  usuario  informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `informacionPersonal`

Contiene información personal detallada del usuario.

```prisma
model informacionPersonal {
  id           Int      @id @default(autoincrement())
  userId       Int      @unique
  fechaNac     DateTime
  genero       String
  estadoCivil  String
  hijos        Boolean
  numeroHijos  Int?
  // Otros campos de información personal

  // Relación con el usuario
  usuario      informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `condicionesvivienda`

Almacena información sobre las condiciones de vivienda del usuario.

```prisma
model condicionesvivienda {
  id              Int     @id @default(autoincrement())
  userId          Int     @unique
  tipoVivienda    String
  propietario     Boolean
  compartida      Boolean
  personasHogar   Int
  // Otros campos relacionados con la vivienda

  // Relación con el usuario
  usuario         informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `educacion`

Registra el nivel educativo y formación del usuario.

```prisma
model educacion {
  id               Int     @id @default(autoincrement())
  userId           Int     @unique
  nivelEducativo   String
  formacionCurso   Boolean
  tipoFormacion    String?
  // Otros campos educativos

  // Relación con el usuario
  usuario          informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `situacionlaboral`

Contiene información sobre la situación laboral del usuario.

```prisma
model situacionlaboral {
  id              Int     @id @default(autoincrement())
  userId          Int     @unique
  situacion       String
  sector          String?
  contrato        String?
  jornada         String?
  // Otros campos laborales

  // Relación con el usuario
  usuario         informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `salud`

Almacena información relacionada con la salud del usuario.

```prisma
model salud {
  id                 Int     @id @default(autoincrement())
  userId             Int     @unique
  problemaSalud      Boolean
  tipoProblema       String?
  tratamiento        Boolean
  tipoTratamiento    String?
  // Otros campos de salud

  // Relación con el usuario
  usuario            informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `ghq12`

Almacena los resultados del cuestionario GHQ-12 (General Health Questionnaire).

```prisma
model ghq12 {
  id           Int      @id @default(autoincrement())
  userId       Int
  fechaTest    DateTime @default(now())
  pregunta1    Int
  pregunta2    Int
  // ... más preguntas
  puntuacion   Int

  // Relación con el usuario
  usuario      informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `dep`

Registra los resultados de un test de depresión.

```prisma
model dep {
  id           Int      @id @default(autoincrement())
  userId       Int
  fechaTest    DateTime @default(now())
  pregunta1    Int
  pregunta2    Int
  // ... más preguntas
  puntuacion   Int

  // Relación con el usuario
  usuario      informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `ans`

Almacena los resultados de un test de ansiedad.

```prisma
model ans {
  id           Int      @id @default(autoincrement())
  userId       Int
  fechaTest    DateTime @default(now())
  pregunta1    Int
  pregunta2    Int
  // ... más preguntas
  puntuacion   Int

  // Relación con el usuario
  usuario      informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `estr`

Contiene los resultados de un test de estrés.

```prisma
model estr {
  id           Int      @id @default(autoincrement())
  userId       Int
  fechaTest    DateTime @default(now())
  pregunta1    Int
  pregunta2    Int
  // ... más preguntas
  puntuacion   Int

  // Relación con el usuario
  usuario      informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `suic`

Registra los resultados de un test de riesgo suicida.

```prisma
model suic {
  id           Int      @id @default(autoincrement())
  userId       Int
  fechaTest    DateTime @default(now())
  pregunta1    Int
  pregunta2    Int
  // ... más preguntas
  puntuacion   Int

  // Relación con el usuario
  usuario      informacionUsuario @relation(fields: [userId], references: [id])
}
```

### `calvida`

Almacena los resultados de un test de calidad de vida.

```prisma
model calvida {
  id           Int      @id @default(autoincrement())
  userId       Int
  fechaTest    DateTime @default(now())
  pregunta1    Int
  pregunta2    Int
  // ... más preguntas
  puntuacion   Int

  // Relación con el usuario
  usuario      informacionUsuario @relation(fields: [userId], references: [id])
}
```

## Migraciones de la Base de Datos

Las migraciones de Prisma se encuentran en el directorio `prisma/migrations/`. La migración inicial (`20250430192443_init`) establece el esquema base de la base de datos.

## Instalación y Configuración

1. Clona este repositorio:

   ```bash
   git clone https://your-repository-url.git
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env` con el siguiente contenido:

   ```
   DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_basedatos"
   PORT=5000
   ```

4. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```

## Variables de Entorno

El archivo `.env` debe contener las siguientes variables:

- `DATABASE_URL`: URL de conexión a la base de datos MySQL.
- `PORT`: Puerto en el que se ejecutará el servidor (por defecto: 5000).
- Otras variables específicas para servicios de IA o texto a voz.

## Ejecución del Servidor

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Para iniciar el servidor en modo producción:

```bash
npm start
```

## Próximos Pasos

- Implementación de autenticación mediante JWT.
- Mejoras en la seguridad de la API.
- Expansión de las capacidades del asistente de IA.
- Desarrollo de endpoints adicionales para análisis de datos.
- Implementación de reportes estadísticos.

## Consideraciones Adicionales

- Asegurarse de configurar correctamente la base de datos antes de iniciar el servidor.
- Los datos sensibles como contraseñas deben ser hasheados antes de almacenarse.
- Considerar la implementación de validación de datos en todas las rutas de la API.
- Es recomendable configurar un sistema de logging para monitorear el comportamiento del servidor.

## Licencia

Este proyecto está licenciado bajo [insertar licencia]. Consulta el archivo LICENSE para más detalles.
