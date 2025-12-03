# API REST - Administración de Productos

API REST desarrollada con Node.js y Express para la administración de productos con autenticación Firebase.

## Tecnologías

- **Node.js** + **Express**
- **Firebase Admin SDK** (Authentication + Firestore)
- **JWT** para tokens
- **CORS** y **Body-parser**

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env` con las siguientes variables:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=tu_secret_key
FIREBASE_PROJECT_ID=tu_project_id
```

Agregar archivo `src/config/serviceAccountKey.json` con las credenciales de Firebase Admin SDK.

## Uso

```bash
# Iniciar servidor
npm run start

# Poblar base de datos (opcional)
node src/scripts/seedProducts.js
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints

### Autenticación

- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión

### Productos

- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products/create` - Crear producto (requiere autenticación)
- `PUT /api/products/:id` - Actualizar producto (requiere autenticación)
- `DELETE /api/products/:id` - Eliminar producto (requiere autenticación)

## Estructura del Proyecto

```
├── index.js
├── src/
│   ├── config/
│   │   ├── firebase.config.js
│   │   └── serviceAccountKey.json
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── products.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── products.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── products.service.js
│   ├── models/
│   │   ├── auth.model.js
│   │   └── products.model.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   └── scripts/
│       └── seedProducts.js
```

## Pruebas

Usar el archivo `api-tests.http` con la extensión REST Client de VS Code, o herramientas como Postman/cURL.

## Autor

Matias Agustin Fare Luis
