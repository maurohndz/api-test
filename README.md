# Estructura de Tests

## Organización de Tests

```
src/
├── controllers/
│   ├── __tests__/
│   │   ├── unit/
│   │   │   └── User.controller.unit.test.js
│   │   ├── integration/
│   │   │   └── User.controller.integration.test.js
│   │   └── e2e/
│   │       └── User.controller.e2e.test.js
│   └── User.controller.js
│
├── services/
│   ├── __tests__/
│   │   ├── unit/
│   │   │   └── User.service.unit.test.js
│   │   ├── integration/
│   │   │   └── User.service.integration.test.js
│   │   └── e2e/
│   │       └── User.service.e2e.test.js
│   └── User.service.js
│
├── repositories/
│   ├── __tests__/
│   │   ├── unit/
│   │   │   └── Users.repository.unit.test.js
│   │   ├── integration/
│   │   │   └── Users.repository.integration.test.js
│   │   └── e2e/
│   │       └── Users.repository.e2e.test.js
│   └── Users.repository.js
│
├── shared/
│   ├── common/
│   │   ├── __tests__/
│   │   │   ├── unit/
│   │   │   │   └── error.common.unit.test.js
│   │   │   └── integration/
│   │   │       └── error.common.integration.test.js
│   │   └── error.common.js
│   │
│   └── database/
│       ├── __tests__/
│       │   ├── unit/
│       │   │   └── connection.unit.test.js
│       │   └── integration/
│       │       └── connection.integration.test.js
│       └── connection.js
│
└── __tests__/
    └── e2e/
        └── flows/
            └── user.flow.e2e.test.js
```

## Configuración

### Jest Config
```javascript
// jest.config.js
module.exports = {
  testMatch: [
    "**/__tests__/**/*.test.js"
  ],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/__tests__/**"
  ]
};
```

### Scripts
```json
{
  "scripts": {
    "test:unit": "jest --testMatch='**/__tests__/unit/**/*.test.js'",
    "test:integration": "jest --testMatch='**/__tests__/integration/**/*.test.js'",
    "test:e2e": "jest --testMatch='**/__tests__/e2e/**/*.test.js'",
    "test": "jest"
  }
}
```

## Tipos de Tests

### Tests Unitarios
- Ubicación: `**/__tests__/unit/`
- Propósito: Probar componentes individuales de forma aislada
- Ejemplos:
  - Lógica de negocio en servicios
  - Métodos de repositorios
  - Utilidades y helpers

### Tests de Integración
- Ubicación: `**/__tests__/integration/`
- Propósito: Probar la interacción entre componentes
- Ejemplos:
  - Controladores con servicios
  - Servicios con repositorios
  - Integración con base de datos

### Tests E2E
- Ubicación: `**/__tests__/e2e/`
- Propósito: Probar flujos completos de la aplicación
- Ejemplos:
  - Flujos de usuario completos
  - Integración con servicios externos
  - Escenarios de uso real

## Buenas Prácticas

1. **Colocación Cercana**
   - Los tests están junto al código que prueban
   - Facilita encontrar y mantener los tests
   - Mejor organización por dominio

2. **Separación por Tipo**
   - Tests unitarios para lógica individual
   - Tests de integración para interacciones
   - Tests E2E para flujos completos

3. **Organización por Capa**
   - Controllers: Tests de controladores
   - Services: Tests de servicios
   - Repositories: Tests de repositorios
   - Shared: Tests de utilidades compartidas

4. **Tests E2E Centralizados**
   - Los tests E2E que prueban flujos completos van en `src/__tests__/e2e/`
   - Permite probar integraciones entre múltiples componentes 