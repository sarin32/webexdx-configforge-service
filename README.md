# WebExDX ConfigForge Service

A Koa-based backend service for managing configurations in the WebExDX ecosystem.

## Features

- **Config CRUD**: full management of configuration data.
- **Robust Wrapper**: leverages `@webexdx/koa-wrap` for consistent server behavior.
- **Data Integrity**: Joi-driven request validation.
- **Persistence**: MongoDB integration.
- **Advanced Logging**: structured logs via Winston and Koa-logger.

## Tech Stack

- **Framework**: Koa with `@webexdx/koa-wrap`
- **Language**: TypeScript
- **Database**: MongoDB
- **Validation**: Joi
- **Logging**: Winston, Koa-logger
- **Linter/Formatter**: Biome
- **Process Manager**: PM2

## Prerequisites

- **Node.js**: >= 22
- **Package Manager**: pnpm
- **MongoDB**: Access to a MongoDB instance.

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm run start
```

### Build

```bash
pnpm run build:prod
```

## Available Scripts

- `pnpm run start`: Runs the service in development mode with nodemon.
- `pnpm run build:prod`: Builds the service for production.
- `pnpm run start:prod`: Runs the production-ready service via PM2.
- `pnpm run lint`: Linting with Biome.
- `pnpm run fix`: Auto-fixing with Biome.

## Docker

### Build

```bash
docker build -t webexdx-configforge-service .
```

### Run

```bash
docker run -p 3001:3001 --env-file .env webexdx-configforge-service
```

The service will be available at `http://localhost:3001`.

## License

ISC
