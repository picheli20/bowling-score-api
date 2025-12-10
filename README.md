# 🎳 Bowling Score API

A RESTful API built with [NestJS](https://nestjs.com/) for calculating bowling game scores. This API uses the [bowling-score-lib](https://www.npmjs.com/package/bowling-score-lib) library to parse bowling sequences and calculate scores according to standard bowling rules.

## 📋 Description

This API provides endpoints to:
- Calculate the total score for a bowling game
- Get round-by-round breakdowns
- Parse bowling notation sequences (e.g., `X`, `/`, `-`)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run start:prod

# Standard development mode
npm run start
```

The API will be available at `http://localhost:3000`

### API Documentation

Once the application is running, visit the interactive Swagger documentation at:

```
http://localhost:3000/api
```

## 📡 API Endpoints

### `POST /calculate`

Calculate the total score for a bowling game.

**Request Body:**
```json
{
  "sequence": "XXXXXXXXXXXX"
}
```

**Response:**
```json
{
  "score": 300
}
```

**Examples:**

```bash
# Perfect game (300 points)
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"sequence": "XXXXXXXXXXXX"}'

# All spares (150 points)
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"sequence": "5/5/5/5/5/5/5/5/5/5/5"}'

# Gutter game (0 points)
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"sequence": "----------------"}'
```

### `POST /rounds`

Calculate the score and get a detailed breakdown of each round.

**Request Body:**
```json
{
  "sequence": "9-9-9-9-9-9-9-9-9-9-"
}
```

**Response:**
```json
{
  "score": 90,
  "rounds": [
    [9, 0],
    [9, 0],
    [9, 0],
    [9, 0],
    [9, 0],
    [9, 0],
    [9, 0],
    [9, 0],
    [9, 0],
    [9, 0]
  ]
}
```

**Example:**

```bash
curl -X POST http://localhost:3000/rounds \
  -H "Content-Type: application/json" \
  -d '{"sequence": "X7/9-X-88/-6XXX81"}'
```

## 🎯 Bowling Notation

The API accepts standard bowling notation:

- `X` - Strike (all 10 pins knocked down on first roll)
- `/` - Spare (all remaining pins knocked down on second roll)
- `-` - Miss (no pins knocked down)
- `0-9` - Number of pins knocked down

**Examples:**
- `XXXXXXXXXXXX` - Perfect game (12 strikes)
- `5/5/5/5/5/5/5/5/5/5/5` - All spares
- `9-9-9-9-9-9-9-9-9-9-` - Consistent 9 pins per frame
- `----------------` - Gutter game

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

## 🔍 Linting

```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint --fix
```

## 🏗️ Project Structure

```
src/
├── app.controller.ts       # API endpoints
├── app.controller.spec.ts  # Controller tests
├── app.service.ts          # Business logic
├── app.module.ts           # Application module
├── main.ts                 # Application entry point
└── interfaces/
    └── score-response.interface.ts  # TypeScript interfaces
```

## 🛠️ Built With

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Swagger/OpenAPI](https://swagger.io/) - API documentation
- [bowling-score-lib](https://www.npmjs.com/package/bowling-score-lib) - Bowling score calculation library
- [Jest](https://jestjs.io/) - Testing framework

## 📝 License

This project is licensed under the UNLICENSED license.
