# API Test

API de ejemplo para catálogos, autenticación y órdenes de servicio.

## Ejecutar la API

```bash
npm install
npm run dev
```

Por defecto la app corre en:

```text
http://localhost:3000
```

---

## Endpoints

### Autenticación

#### POST /auth/login

Inicia sesión con un usuario mock.

Body:

```json
{
  "username": "admin",
  "password": "f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae"
}
```

Respuesta exitosa:

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

Error:

```json
{
  "message": "Invalid credentials"
}
```

---

### Catálogos

#### GET /catalog/animals

Obtiene todos los animales del catálogo.

#### GET /catalog/animals/:id

Obtiene un animal por ID.

#### GET /catalog/services

Obtiene todos los servicios del catálogo.

#### GET /catalog/services/:id

Obtiene un servicio por ID.

#### GET /catalog/events

Obtiene todos los tipos de eventos del catálogo.

#### GET /catalog/events/:id

Obtiene un tipo de evento por ID.

#### GET /catalog/corrals

Obtiene los corrales disponibles.

#### GET /catalog/motivos/canal

Obtiene motivos de canal.

#### GET /catalog/motivos/viscera

Obtiene motivos de viscera.

---

### Service Orders

#### GET /service-orders

Obtiene todas las órdenes de servicio.

#### GET /service-orders/:id/events

Obtiene los eventos asociados a una orden de servicio.

Ejemplo:

```http
GET /service-orders/1001/events
```

Respuesta:

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

Agrega un nuevo evento a la lista de eventos de una orden.

Ejemplo de body:

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
    },
    {
      "displayName": "Foto del fleje",
      "type": "PHOTO",
      "content": [331]
    }
  ]
}
```

Respuesta exitosa:

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

## Notas

- Los datos se mantienen en memoria dentro de la app, no en base de datos.
- Las rutas están montadas en el servidor con los prefijos:
  - `/auth`
  - `/catalog`
  - `/service-orders`
