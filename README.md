# ⚡ Atom Challenge - Fullstack App (Angular + NestJS (Express y Typescript) + Firebase)

Este es un proyecto fullstack que permite a los usuarios gestionar tareas personales de forma segura, con autenticación por token personalizada, backend serverless con NestJS sobre Firebase Functions, y frontend responsivo usando Angular + Angular Material + TailwindCSS.

---

¡Claro que sí, Juan Pablo! Aquí tienes un bloque de texto para agregar en tu README.md, bien claro y profesional:

⸻

## 🌐 Demo en producción

Puedes ver la aplicación funcionando en producción en el siguiente enlace:

🔗 https://atom-challenge-tasks.web.app

Esta es la versión final desplegada del proyecto:
- 🧩 Frontend: Aplicación Angular desplegada en Firebase Hosting
- 🔥 Backend: API REST construida con NestJS y alojada en Firebase Cloud Functions
- ✅ Seguridad basada en token JWT generado a partir del correo electrónico del usuario
- ☁️ Comunicación segura entre frontend y backend mediante HTTPS y reglas de CORS

⸻

## 🧱 Tecnologías utilizadas

### 🖥️ Frontend
- Angular 17
- Angular Material
- TailwindCSS
- RxJS
- TypeScript

### 🧰 Backend
- NestJS ((Express y Typescript))
- Firebase Functions (v2 HTTPS)
- Firestore
- JSON Web Tokens (JWT)
- Dotenv para manejo de secretos

---

## 📁 Estructura del proyecto
```txt
atom-challenge/
├── functions/                # Backend (NestJS dentro de Firebase Functions)
│   ├── src/
│   ├── .env                  # Variables locales (no se sube)
│   └── …
├── src/                      # Frontend Angular
├── environments/            # Variables Angular (dev/prod)
├── .gitignore
├── firebase.json
├── angular.json
├── README.md
└── …
```
---

## 🚀 Cómo ejecutar el proyecto

### 🔧 Requisitos previos

- Node.js 20.x+
- Angular CLI
- Firebase CLI (`npm install -g firebase-tools`)
- Cuenta Firebase con Firestore habilitado

---

### 📦 Instalar dependencias

```bash
# Desde la raíz del proyecto
npm install

# Ir al backend
cd functions
npm install

```
---

### ▶️ Ejecutar en desarrollo

🖥️ Frontend (Angular)

```bash

npm run start

# Se abrirá en: http://localhost:4200

# 🔥 Backend (Firebase Functions + NestJS)

cd functions
npm run build
firebase emulators:start

# API base: http://localhost:5001/YOUR_PROJECT_ID/us-central1/api

```

⸻

### 🔒 Variables de entorno

🔐 Backend - functions/.env

JWT_SECRET=clave-ultra-secreta

Este archivo no se sube a Git (está ignorado en .gitignore).

🌐 Frontend - environment.ts

Archivo: src/environments/environment.ts

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5001/YOUR_PROJECT_ID/us-central1/api'
};

Para producción: modifica environment.prod.ts.

⸻

### 🛠️ Scripts útiles

🔧 Desarrollo

#### Angular
```bash

npm run start

```

⚙️ Scripts de Build Optimizados

El proyecto está configurado con scripts optimizados para producción, incluyendo:
- ✅ Tree shaking: Eliminación automática de código no utilizado durante el build (--configuration=production)
- ✅ Minificación y Uglify: Código JavaScript reducido para mejorar el rendimiento en carga
- ✅ Compresión y hashing de assets: Archivos estáticos con nombres únicos para cacheo eficiente
- ✅ Lazy loading de rutas en Angular para mejorar el tiempo de carga inicial

🛠️ Comando para generar el build de producción:

```bash
npm run build -- --configuration=production

# El resultado se genera en www/browser y es el que se despliega en Firebase Hosting.
```

#### Backend

```bash
cd functions
npm run build
firebase emulators:start
```

🚀 Despliegue a Firebase

```bash
cd functions
npm run build
firebase deploy --only functions
```

⸻

## 🔐 Seguridad
	•	Todos los endpoints protegidos por tokens JWT
	•	Los tokens son generados con JWT_SECRET y deben ser almacenados con cuidado
	•	El backend solo permite acceso a tareas del usuario autenticado

⸻

## 📦 Funcionalidades
	•	Login con correo electrónico (sin contraseña)
	•	Generación segura de token
	•	Listar tareas propias
	•	Crear, editar, completar y eliminar tareas
	•	Accesibilidad y navegación con teclado
	•	Responsive design
	•	Guard para rutas protegidas en Angular
	•	Separación clara por módulos, DDD en el backend

⸻


## ✅ 🧪 Pruebas automatizadas

### 🔹 Frontend (Angular)

Desde la raíz del proyecto
```bash

npm run test

```

	•	Usa Karma + Jasmine
	•	Pruebas unitarias para servicios (AuthService, TaskService), páginas (LoginPage, TasksPage)
	•	Mockeos de servicios y uso de NoopAnimationsModule y HttpClientTestingModule

### 🔹 Backend (NestJS)

```bash
cd functions
npm run test

```

	•	Usa Jest
	•	Pruebas unitarias siguiendo DDD (servicios, entidades, repositorios)
	•	Pruebas con mocks para Firestore, JwtService, y repositorios abstractos

⸻

## ⚙️ CI/CD con GitHub Actions

El repositorio está configurado para desplegar automáticamente:

🚀 Frontend
	•	Cuando se hace push a main o PR a main que modifique /src
	•	Action: deploy-live.yml
	•	Se despliega a Firebase Hosting, usando firebase.json con target atom

🔥 Backend
	•	Cuando se hace push a main que modifique la carpeta /functions
	•	Action: deploy-backend.yml
	•	Se despliega con firebase deploy --only functions:api
	•	Usa secret FIREBASE_SERVICE_ACCOUNT para autenticación con Google Cloud

⸻

## 🧾 Documentación adicional de configuración

🔑 Secrets & Entorno
	•	Variables sensibles se guardan en Firebase como secrets seguros
	•	Se usa defineSecret('JWT_SECRET') en el backend
	•	También puede usarse archivo .env local para desarrollo (functions/.env)

📁 Organización de carpetas
	•	Frontend: Angular standalone modules, componentes accesibles y lazy-loaded
	•	Backend: NestJS modular, con DDD (Domain, Application, Infrastructure)
	•	repositorios, entidades, factories, y casos de uso

🛡️ Seguridad
	•	Autenticación basada en email → token JWT con ID y email del usuario
	•	Middleware que valida y extrae el usuario del token en cada request
	•	Las tareas son accesibles solo por el usuario que las creó

⸻

## 📌 Licencia

MIT - Hecho con 💙 por Juan Pablo Hurtado

⸻
