# API Test

API Express con datos mock en memoria para autenticación, catálogos, órdenes de servicio y almacenamiento de fotos con Supabase.

## Requisitos

- Node.js 18+
- npm
- opcional: cuenta de Supabase con un bucket público o con permisos adecuados para subir y descargar archivos

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación queda disponible en:

```text
http://localhost:3000
```

También puedes compilarla y ejecutarla en producción:

```bash
npm run build
npm start
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_BUCKET=photos
```

> `SUPABASE_URL` y `SUPABASE_ANON_KEY` son requeridos para que los endpoints de fotos funcionen.

## Rutas principales

### Estado del servidor

#### GET /

Devuelve un texto simple para comprobar que la API está levantada.

Respuesta:

```text
API Running
```

---

### Autenticación

#### POST /auth/login

Inicia sesión con un usuario mock.

Ejemplo de body:

```json
{
  "username": "admin",
  "password": "f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae"
}
```

Respuesta exitosa (`200`):

```json
{
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Mary Sue",
    "role": "Administrador",
    "events": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  "accessToken": "fake-jwt-token-for-Mary Sue"
}
```

Respuesta inválida (`401`):

```json
{
  "message": "Invalid credentials"
}
```

---

### Catálogos

Todos los endpoints de catálogo se montan bajo `/catalog`.

#### GET /catalog/animals

Obtiene todos los animales.

#### GET /catalog/animals/:id

Obtiene un animal por ID.

#### GET /catalog/services

Obtiene todos los servicios.

#### GET /catalog/services/:id

Obtiene un servicio por ID.

#### GET /catalog/events

Obtiene todos los tipos de eventos.

#### GET /catalog/events/:id

Obtiene un tipo de evento por ID.

#### GET /catalog/corrals

Obtiene los corrales disponibles.

#### GET /catalog/motivos-canal

Obtiene motivos de canal.

#### GET /catalog/motivos-viscera

Obtiene motivos de viscera.

---

### Órdenes de servicio

Todos los endpoints se montan bajo `/service-orders`.

#### GET /service-orders

Obtiene todas las órdenes de servicio.

#### GET /service-orders/:id/events

Obtiene los eventos asociados a una orden por su ID.

Ejemplo:

```http
GET /service-orders/1001/events
```

Respuesta ejemplo:

```json
[
  {
    "id": 1,
    "eventTypeId": 1,
    "date": "2026-07-26T08:30:00.000Z",
    "description": "Recepción de 50 animales",
    "animals": [],
    "additionals": [
      {
        "displayName": "Fleje",
        "dataType": "PHOTO",
        "content": [1]
      }
    ]
  }
]
```

#### POST /service-orders/:id/events

Crea un evento para una orden existente.

Body ejemplo:

```json
{
  "eventTypeId": 1,
  "date": "2026-07-29T16:20:00Z",
  "description": "Llegada de animales sin problemas",
  "animals": null,
  "additionals": [
    {
      "displayName": "Kilos de llegada",
      "dataType": "NUMBER",
      "content": 1000
    },
    {
      "displayName": "Sexo",
      "dataType": "SEXO",
      "content": "MIXTO"
    },
    {
      "displayName": "Corral Asignado",
      "dataType": "CORRAL",
      "content": [
        {
          "corral": "B-2",
          "qty": 50
        }
      ]
    }
  ]
}
```

Respuesta exitosa (`201`):

```json
{
  "id": 7,
  "eventTypeId": 1,
  "date": "2026-07-29T16:20:00.000Z",
  "description": "Llegada de animales sin problemas",
  "animals": null,
  "additionals": [
    {
      "displayName": "Kilos de llegada",
      "dataType": "NUMBER",
      "content": 1000
    }
  ]
}
```

Si la orden no existe:

```json
{
  "message": "Service order not found."
}
```

---

### Fotos

Los endpoints de fotos se montan bajo `/photos`.

#### POST /photos

Sube una imagen con multipart/form-data usando el campo `file` o `photo`.

Ejemplo con curl:

```bash
curl -X POST http://localhost:3000/photos \
  -F "file=@/ruta/a/imagen.jpg"
```

Respuesta exitosa (`200`):

```json
{
  "success": true,
  "photoId": 1786745151428,
  "url": "https://xxxxx.supabase.co/storage/v1/object/public/photos/1786745151428.jpg"
}
```

#### GET /photos/:photoId

Obtiene la imagen desde Supabase Storage.

Ejemplo:

```http
GET /photos/1786745151428
```

---

## Notas de implementación

- Los datos se mantienen en memoria dentro de la app; no hay base de datos.
- La API se monta con los prefijos:
  - `/auth`
  - `/catalog`
  - `/service-orders`
  - `/photos`
- El bucket de Supabase debe existir y tener permisos públicos o configurados adecuadamente para que la subida y descarga funcionen.
- Si `SUPABASE_URL` o `SUPABASE_ANON_KEY` no están configurados, los endpoints de fotos devolverán un error `500`.

## Estructura del proyecto

```text
src/
  server.ts
  controllers/
  data/
  models/
  routes/
  services/
```
