# API REST - Administración de Productos

API REST desarrollada con Node.js y Express para la administración de productos con autenticación Firebase.

🚀 **API en producción:** [https://nodeprojectttech.vercel.app](https://nodeprojectttech.vercel.app)

## Tecnologías

- **Node.js** + **Express**
- **Firebase Admin SDK** (Authentication + Firestore)
- **JWT** para tokens
- **CORS** y **Body-parser**

## Instalación Local

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
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_STORAGE_BUCKET=tu_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id
```

Agregar archivo `src/config/serviceAccountKey.json` con las credenciales de Firebase Admin SDK.

## Uso Local

```bash
# Iniciar servidor
npm run start

# Poblar base de datos (opcional)
node src/scripts/seedProducts.js
```

## Endpoints

### Autenticación

#### Registrar Usuario

```http
POST https://nodeprojectttech.vercel.app/auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

#### Iniciar Sesión

```http
POST https://nodeprojectttech.vercel.app/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Respuesta:**

```json
{
  "status": 200,
  "message": "Login successful",
  "customToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "uid": "...",
    "email": "usuario@example.com"
  }
}
```

### Productos

#### Listar Todos los Productos (Pública)

```http
GET https://nodeprojectttech.vercel.app/api/products
```

#### Obtener Producto por ID (Pública)

```http
GET https://nodeprojectttech.vercel.app/api/products/{id}
```

#### Crear Producto (Requiere Autenticación)

```http
POST https://nodeprojectttech.vercel.app/api/products/create
Authorization: Bearer {tu_firebase_id_token}
Content-Type: application/json

{
  "title": "Producto Nuevo",
  "price": 99.99,
  "description": "Descripción del producto",
  "category": "Electronics",
  "image": "https://example.com/image.jpg"
}
```

#### Actualizar Producto (Requiere Autenticación)

```http
PUT https://nodeprojectttech.vercel.app/api/products/{id}
Authorization: Bearer {tu_firebase_id_token}
Content-Type: application/json

{
  "price": 79.99,
  "description": "Nueva descripción"
}
```

#### Eliminar Producto (Requiere Autenticación)

```http
DELETE https://nodeprojectttech.vercel.app/api/products/{id}
Authorization: Bearer {tu_firebase_id_token}
```

## Estructura del Proyecto

```
├── index.js
├── vercel.json
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

## Códigos de Estado HTTP

- **200** - OK
- **201** - Created
- **400** - Bad Request (datos inválidos)
- **401** - Unauthorized (sin token)
- **403** - Forbidden (token inválido/expirado)
- **404** - Not Found (recurso no existe)
- **500** - Internal Server Error

## Pruebas

### Opción 1: Postman

Importar las peticiones desde `api-tests.http` o crear manualmente.

### Opción 2: cURL

```bash
# Listar productos
curl https://nodeprojectttech.vercel.app/api/products

# Registrar usuario
curl -X POST https://nodeprojectttech.vercel.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Opción 3: REST Client (VS Code)

Usar el archivo `api-tests.http` con la extensión REST Client.

## Deployment

Deployado en Vercel: [https://nodeprojectttech.vercel.app](https://nodeprojectttech.vercel.app)

## Autor

Matias Agustin Fare Luis
