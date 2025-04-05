# ⚡ Atom Challenge - Fullstack App (Angular + NestJS + Firebase)

Este es un proyecto fullstack que permite a los usuarios gestionar tareas personales de forma segura, con autenticación por token personalizada, backend serverless con NestJS sobre Firebase Functions, y frontend responsivo usando Angular + Angular Material + TailwindCSS.

---

## 🧱 Tecnologías utilizadas

### 🖥️ Frontend
- Angular 17
- Angular Material
- TailwindCSS
- RxJS
- TypeScript

### 🧰 Backend
- NestJS
- Firebase Functions (v2 HTTPS)
- Firestore
- JSON Web Tokens (JWT)
- Dotenv para manejo de secretos

---

## 📁 Estructura del proyecto

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



⸻

▶️ Ejecutar en desarrollo

🖥️ Frontend (Angular)

npm run start

Se abrirá en: http://localhost:4200

🔥 Backend (Firebase Functions + NestJS)

cd functions
npm run build
firebase emulators:start

API base: http://localhost:5001/YOUR_PROJECT_ID/us-central1/api

⸻

🔒 Variables de entorno

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

🛠️ Scripts útiles

🔧 Desarrollo

# Angular
npm run start

# Backend
cd functions
npm run build
firebase emulators:start

🚀 Despliegue a Firebase

cd functions
npm run build
firebase deploy --only functions



⸻

🔐 Seguridad
	•	Todos los endpoints protegidos por tokens JWT
	•	Los tokens son generados con JWT_SECRET y deben ser almacenados con cuidado
	•	El backend solo permite acceso a tareas del usuario autenticado

⸻

📦 Funcionalidades
	•	Login con correo electrónico (sin contraseña)
	•	Generación segura de token
	•	Listar tareas propias
	•	Crear, editar, completar y eliminar tareas
	•	Accesibilidad y navegación con teclado
	•	Responsive design
	•	Guard para rutas protegidas en Angular
	•	Separación clara por módulos, DDD en el backend

⸻

📌 Licencia

MIT - Hecho con 💙 por Juan Pablo Hurtado

⸻
