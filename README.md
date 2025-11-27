# ⚽ ELEVN - Fantasy Football Platform

**ELEVN** es una plataforma web profesional de pronósticos deportivos (Quiniela) donde los usuarios compiten prediciendo resultados de fútbol. Cuenta con ligas privadas, ranking global en tiempo real, perfiles detallados con estadísticas y un panel de administración completo para la gestión del torneo.

![ELEVN Preview](public/img/fondo-login/elevn-fondo-login.jpg)
> *Vista previa de la página de inicio de sesión de ELEVN, la puerta de entrada para gestionar pronósticos, ver rankings y administrar ligas.*

---

## 🚀 Características Principales

* **Quiniela Global:** Predice marcadores y gana puntos (3 pts por resultado exacto, 1 pt por acertar ganador).
* **Ligas Privadas:** Crea torneos exclusivos con amigos, genera códigos de invitación únicos y gestiona partidos específicos para tu liga.
* **Perfil V8 (Estilo Red Social):** Estadísticas de efectividad, historial de tickets, avatares personalizados y ranking en tiempo real.
* **Panel de Administración:** Gestión total de usuarios (con roles), creación de partidos, control de resultados y sistema de soporte (tickets).
* **Diseño Responsivo:** Interfaz moderna adaptativa con modos específicos para Móvil (App View) y Escritorio (Dashboard View).
* **Seguridad:** Autenticación robusta con JWT, contraseñas hasheadas (Bcrypt) y protección de rutas (Middleware).

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js, Express.js
* **Base de Datos:** MySQL
* **Frontend:** HTML5, CSS3 (Grid/Flexbox, Animaciones), JavaScript (ES6 Modules)
* **Autenticación:** JSON Web Tokens (JWT)
* **Email:** Nodemailer (Recuperación de contraseñas)
* **Cifrado:** Bcrypt

---

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado en tu máquina:
1.  **Node.js** (v16 o superior) - [Descargar](https://nodejs.org/)
2.  **MySQL Server** (v8.0 o superior) - [Descargar](https://dev.mysql.com/downloads/installer/)
3.  **Git** - [Descargar](https://git-scm.com/)

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para desplegar el proyecto localmente:

### 1. Clonar el Repositorio
```bash
git clone [https://github.com/eorellana2008/elevn.git](https://github.com/eorellana2008/elevn.git)
cd elevn

2. Instalar Dependencias
Ejecuta el siguiente comando dentro de la carpeta raíz del proyecto para descargar las librerías necesarias (express, mysql2, bcrypt, etc.):

Bash

npm install
3. Configurar Base de Datos (MySQL)
Entra a tu gestor SQL favorito (MySQL Workbench, DBeaver, phpMyAdmin).

Crea la base de datos:

SQL

CREATE DATABASE elevn_db;
Importar Tablas: Abre el archivo de script SQL proporcionado (o copia el esquema) y ejecútalo en tu cliente SQL para crear las tablas (users, matches, leagues, etc.) y poblar los catálogos iniciales.

Tip de Solución de Problemas: Si tienes problemas al conectar, verifica que el servicio de MySQL esté corriendo y que el puerto (usualmente 3306) no esté ocupado.

4. Variables de Entorno (.env)
Crea un archivo llamado .env en la raíz del proyecto. Configura las variables adecuadamente para tu entorno local:

Fragmento de código

PORT=3000

# Configuración de Base de Datos
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=elevn_db
DB_PORT=3000

# Seguridad (JWT)
JWT_SECRET=clave_secreta_para_tokens_123

# Frontend (Para links de correos)
FRONTEND_URL=http://localhost:3000

# Correo (Para recuperación de contraseñas - Gmail requiere "Contraseña de Aplicación")
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
▶️ Ejecución
Para iniciar el servidor:

Bash

npm start
Si todo está correcto, verás en la consola:

Plaintext

MySQL Conectado ID: ...
Servidor corriendo en http://localhost:3000
Abre tu navegador y visita http://localhost:3000.

Nota: Si el servidor no se inicia, revisa los logs de errores en la consola. Asegúrate de que las credenciales en .env son correctas y que la base de datos existe.

📚 Documentación de la API
La API de ELEVN está organizada en los siguientes módulos principales:

Auth: /api/auth (Login, Registro, Reset Password)

Usuarios: /api/users (Perfil, Listado Admin, Crear Admin)

Partidos: /api/matches (CRUD de partidos y marcadores)

Ligas: /api/leagues (Gestión de ligas privadas y sus miembros)

Predicciones: /api/predictions (Guardar y leer pronósticos)

👤 Gestión de Usuarios y Roles
El sistema maneja 4 niveles de acceso controlados por base de datos:

Super Admin: Acceso total al sistema.

Admin: Gestión de partidos y usuarios.

Moderador: Gestión limitada (solo resultados).

Usuario: Jugador normal (Rol por defecto al registrarse).

Para promover un usuario a Admin en local, edita el campo role_id en la tabla users directamente en la base de datos.

📂 Estructura del Proyecto
Plaintext

elevn/
├── db/                 # Conexión a la Base de Datos
├── public/             # Frontend (Archivos Estáticos)
│   ├── css/            # Estilos Globales (styles.css)
│   ├── img/            # Logos y Fondos
│   ├── js/
│   │   ├── components/ # Componentes Reutilizables (MatchCard, LeagueCard)
│   │   ├── controllers/# Lógica de Vistas (Auth, Admin, Results, Profile)
│   │   ├── services/   # Comunicación con API (api.js)
│   │   └── utils/      # Utilidades (Session, DOM)
│   └── *.html          # Vistas HTML
├── src/                # Backend (API)
│   ├── controllers/    # Controladores de Rutas (Lógica HTTP)
│   ├── middleware/     # Protección (Auth, Roles)
│   ├── models/         # Consultas SQL
│   ├── routes/         # Definición de Endpoints
│   ├── services/       # Lógica de Negocio (Cálculo de Puntos, Reglas)
│   └── utils/          # Helpers (Emails)
├── .env                # Variables de Entorno
├── server.js           # Punto de Entrada
└── package.json        # Dependencias y Scripts
📄 Licencia
Este proyecto es privado y desarrollado con fines educativos/comerciales. No tiene licencia para distribución pública sin autorización.

Desarrollado para ELEVN ©
