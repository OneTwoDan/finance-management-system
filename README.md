# Finance Management System

Un sistema integral para la gestión de finanzas, construido con Next.js y un stack moderno. Permite a los usuarios administrar sus movimientos (ingresos y gastos), generar reportes, y gestionar acceso con roles y autenticación segura.

## 🚀 Características Principales

- **Gestión de Movimientos:** Registro, edición y eliminación de ingresos y gastos.
- **Autenticación y Autorización:** Integrado con Better Auth. Control de roles (Administrador y Usuario).
- **Reportes:** Visualización de saldo total y movimientos de la cuenta.
- **Gestión de Usuarios:** Eliminación lógica (Soft Delete) y gestión de estado (Activo/Inactivo).
- **Documentación de API:** Rutas de la API documentadas usando Swagger/OpenAPI (`/api/docs`).
- **Pruebas Unitarias:** Configurado con Vitest para asegurar el correcto funcionamiento lógico y de seguridad.

## 🛠️ Tecnologías Utilizadas

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Componentes UI:** [Shadcn UI](https://ui.shadcn.com/), Lucide React
- **Base de Datos & ORM:** PostgreSQL + Prisma
- **Autenticación:** Better Auth
- **Testing:** Vitest
- **Documentación de API:** next-swagger-doc / swagger-ui-react

---

## 💻 Ejecutar el Proyecto Localmente

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local.

### 1. Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/) (generalmente se instala con Node.js)
- Una base de datos PostgreSQL en funcionamiento (por ejemplo, Supabase, Neon, o localmente).

### 2. Clonar e Instalar Dependencias

```bash
git clone <URL_DEL_REPOSITORIO>
cd finance-management-system
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo llamado `.env` en la raíz del proyecto. Puedes basarte en un archivo `.env.example` si existe, o utilizar la siguiente estructura básica.

Asegúrate de configurar los valores de conexión a la base de datos y autenticación:

```env
# URL de conexión a tu base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:password@host:puerto/nombre_bd?schema=public"

# URL base de tu aplicación local
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Secreto para Better Auth (puedes generar uno con: openssl rand -base64 32)
BETTER_AUTH_SECRET="tu_secreto_generado"
BETTER_AUTH_URL="http://localhost:3000"
```

### 4. Configurar la Base de Datos con Prisma

Aplica las migraciones y sincroniza tu esquema en la base de datos:

```bash
npx prisma db push
# O si usas migraciones:
# npx prisma migrate dev --name init
```

Genera el cliente de Prisma:

```bash
npx prisma generate
```

### 5. Iniciar el Servidor de Desarrollo

Ejecuta el siguiente comando para levantar el entorno de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).
La documentación de la API estará en [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

### 6. Ejecutar las Pruebas

Para correr la suite de tests unitarios configurada con Vitest:

```bash
npm run test
```

---

## ☁️ Desplegar en Vercel

Vercel es la plataforma recomendada para proyectos desarrollados con Next.js. El proceso de despliegue es muy sencillo.

### Forma 1: Usando la Interfaz Web de Vercel (Recomendado)

1. Sube tu repositorio a GitHub, GitLab o Bitbucket.
2. Inicia sesión en [Vercel](https://vercel.com/) y haz clic en **"Add New..." > "Project"**.
3. Importa tu repositorio.
4. En la configuración del proyecto (Environment Variables), añade todas las variables de tu archivo `.env`:
   - `DATABASE_URL` (Asegúrate de usar la URL de conexión preparada para producción/pooling si aplica).
   - `NEXT_PUBLIC_APP_URL` (Debe ser tu dominio de producción, ej. `https://tu-app.vercel.app`).
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (La URL de tu entorno en Vercel).
5. Vercel detectará que es un proyecto de Next.js. Los comandos de Build (`next build`) y directivas de output ya están configurados por defecto.
6. En **"Build and Output Settings"**, si necesitas generar el cliente de Prisma en cada despliegue, puedes modificar el "Build Command" a:
   ```bash
   npx prisma generate && next build
   ```
   *(Nota: Puedes agregar `postinstall: "prisma generate"` a tu package.json en lugar de esto)*.
7. Haz clic en **Deploy**.

### Forma 2: Usando Vercel CLI

Si cuentas con la CLI de Vercel instalada globalmente (`npm i -g vercel`), puedes hacer el despliegue desde la terminal:

```bash
# Iniciar sesión en Vercel
vercel login

# Vincular y desplegar el proyecto
vercel
```

Durante la ejecución, la CLI te preguntará las configuraciones iniciales. Recuerda ir al panel de control online del proyecto creado en Vercel para cargar las variables de entorno necesarias y luego hacer un despliegue de producción con:

```bash
vercel --prod
```

---
Licencia
Este proyecto es privado y solo para uso autorizado.
