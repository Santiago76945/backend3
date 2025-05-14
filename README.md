# Backend 3 – Primera Preentrega

Este proyecto es la primera entrega del módulo Backend 3. Provee un conjunto de endpoints para:

- Generar datos de prueba (mocks) de usuarios y mascotas.
- Insertar lotes de usuarios y mascotas en MongoDB.
- Consultar tanto datos mock como los persistidos en la base.

---

## 🚀 Tecnologías

- **Node.js**  
- **Express**  
- **MongoDB Atlas**  
- **Mongoose**  
- **dotenv**  
- **bcrypt**  
- **@faker-js/faker**  
- **nodemon** (dev)

---

## 🛠 Instalación

1. Clonar este repositorio  
   ```bash
   git clone https://github.com/tu-usuario/backend3-preentrega.git
   cd backend3-preentrega
````

2. Instalar dependencias

   ```bash
   npm install
   ```

3. Crear un archivo `.env` en la raíz del proyecto usando como base `.env.example`.

4. Ejecutar el servidor

   ```bash
   npm run dev
   ```

---

## 🌐 Variables de entorno

Incluidas en el archivo `.env.example`. Debés crear tu propia base en MongoDB Atlas y reemplazar los valores:

```env
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre_base>?retryWrites=true&w=majority
PORT=8080
```

---

## 📦 Scripts disponibles

```bash
npm run dev   # Inicia el servidor con nodemon
```

---

## 🔌 Endpoints

Todos montados bajo `/api/mocks`

| Método | Endpoint        | Descripción                                    |
| ------ | --------------- | ---------------------------------------------- |
| GET    | `/mockingusers` | Devuelve 50 usuarios mock (no persistidos)     |
| GET    | `/mockingpets`  | Devuelve 100 mascotas mock (no persistidas)    |
| POST   | `/generateData` | Inserta `users` y `pets` reales en MongoDB     |
| GET    | `/users`        | Devuelve todos los usuarios guardados en la DB |
| GET    | `/pets`         | Devuelve todas las mascotas guardadas en la DB |

