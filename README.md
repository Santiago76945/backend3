````markdown
# Backend3 – Proyecto Final

Este repositorio contiene la entrega final del módulo Backend3. Provee endpoints para generación y gestión de datos mock (usuarios y mascotas), adopciones, y documentación interactiva con Swagger. Además está Dockerizado para facilitar su despliegue.

---

## 📖 Descripción

- **Mocks**: Generación de usuarios y mascotas de prueba, inserción en MongoDB, consulta de datos persistidos.
- **Adopciones**: Endpoints para asociar mascotas a usuarios (crear, listar, eliminar adopciones).
- **Documentación**: Swagger UI disponible en `/api/docs`.
- **Tests**: Cobertura con Jest + Supertest.
- **Docker**: Contenedor listo para producción.

---

## 🛠 Tecnologías

- Node.js v18 (ES Modules)  
- Express  
- MongoDB Atlas + Mongoose  
- Swagger (swagger-jsdoc, swagger-ui-express)  
- Jest, Supertest, mongodb-memory-server  
- Docker

---

## 🚀 Instalación local

1. Clonar el repositorio  
   ```bash
   git clone https://github.com/tu-usuario/backend3.git
   cd backend3
````

2. Instalar dependencias

   ```bash
   npm install
   ```

3. Copiar ejemplo de variables de entorno

   ```bash
   cp .env.example .env
   ```

   Completar `.env` con tu cadena de conexión a MongoDB Atlas:

   ```env
   MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre_base>?retryWrites=true&w=majority
   PORT=8080
   ```

4. Ejecutar en modo desarrollo

   ```bash
   npm run dev
   ```

5. Abrir Swagger UI en el navegador

   ```
   http://localhost:8080/api/docs
   ```

---

## 📋 Scripts disponibles

* `npm run dev` — Inicia el servidor con nodemon
* `npm test`   — Ejecuta los tests (Jest + Supertest)

---

## 📄 Documentación Swagger

Una vez levantada la app, accedé a la documentación interactiva en:

```
http://localhost:8080/api/docs
```

Ahí podés ver y probar todos los endpoints:

* **Mocks**:

  * `GET  /api/mocks/mockingusers`
  * `GET  /api/mocks/mockingpets`
  * `POST /api/mocks/generateData`
  * `GET  /api/mocks/users`
  * `GET  /api/mocks/pets`

* **Adopciones**:

  * `POST   /api/adoptions`
  * `GET    /api/adoptions`
  * `GET    /api/adoptions/:userId`
  * `DELETE /api/adoptions/:userId/:petId`

---

## 🐳 Docker

### Construir la imagen

```bash
docker build -t santiago76945/backend3 .
```

### Ejecutar el contenedor

```bash
docker run -d \
  -p 8080:8080 \
  --env-file .env \
  --name backend3 \
  santiago76945/backend3
```

* La app quedará disponible en `http://localhost:8080`
* Swagger UI en `http://localhost:8080/api/docs`

### Publicar en Docker Hub

```bash
docker push santiago76945/backend3
```

Imagen pública en Docker Hub:
[https://hub.docker.com/r/santiago76945/backend3](https://hub.docker.com/r/santiago76945/backend3)

---

## 📦 Archivos clave

* `Dockerfile`
* `.dockerignore`
* `.env.example`
* `src/index.js`
* `src/config/db.js`
* `src/config/swagger.js`
* `src/mocks/mocks.router.js`
* `src/routes/adoption.router.js`
* `src/models/User.model.js`
* `src/models/Pet.model.js`
* `tests/adoption.test.js`

---
