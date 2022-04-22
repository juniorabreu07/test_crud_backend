# Api

 Api de cual implementa Sequelize como ORM, PostgreSQL como Base De Datos.

## Requisitos

- Docker
- NodeJS

# Corrida

Primero instalar las dependencias

```bash
  npm i
```

Configurar el entorno para DB utilizando Docker

```bash
docker-compose up
```

Luego inicar el servicio del API Rest

```bash
npm run start
```

## Verificar

```sh
http://localhost:3000/api/v1/products
```

Para verificar el serivico puede ingresar a su navegador con esta ruta.

## Rutas

  { method: 'GET', path: '/' }, <br>
  { method: 'POST', path: '/api/v1/auth/signup' }, <br>
  { method: 'POST', path: '/api/v1/auth/signin' }, <br>
  { method: 'POST', path: '/api/v1/auth/signout' }, <br>
  { method: 'GET', path: '/api/v1/products' }, <br>
  { method: 'GET', path: '/api/v1/products/:id' }, <br>
  { method: 'DELETE', path: '/api/v1/products/:id' }, <br>
  { method: 'PUT', path: '/api/v1/products/:id' }, <br>
  { method: 'POST', path: '/api/v1/products' } <br>
