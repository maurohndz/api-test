# Git Flow y Control de Versiones

## Estructura de Ramas

### Ramas Principales
- `main`: Rama de producción
- `develop`: Rama de desarrollo

### Ramas de Soporte
- `feature/*`: Para nuevas funcionalidades
- `release/*`: Para preparación de releases
- `hotfix/*`: Para correcciones urgentes en producción
- `bugfix/*`: Para correcciones de bugs en desarrollo

## Convención de Nombres

### Ramas de Feature
```
feature/nombre-feature
feature/ABC-123-nombre-feature
```

### Ramas de Hotfix
```
hotfix/nombre-correccion
hotfix/ABC-123-nombre-correccion
```

### Ramas de Release
```
release/1.0.0
```

## Flujo de Trabajo

1. **Nueva Funcionalidad**
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/nombre-feature
   # Desarrollar cambios
   git add .
   git commit -m "feat: descripción del cambio"
   git push origin feature/nombre-feature
   ```

2. **Crear Pull Request**
   - Crear PR desde `feature/*` hacia `develop`
   - Asignar revisores
   - Esperar aprobación

3. **Merge a Develop**
   - Solo después de aprobación
   - Resolver conflictos si existen
   - Merge con squash

4. **Release**
   ```bash
   git checkout develop
   git checkout -b release/1.0.0
   # Preparar release
   git checkout main
   git merge release/1.0.0
   git tag -a v1.0.0 -m "Release 1.0.0"
   ```

## Convención de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato
- `refactor:` Refactorización de código
- `test:` Adición o modificación de tests
- `chore:` Cambios en el proceso de build

## Buenas Prácticas

1. **Commits Atómicos**
   - Un commit por cambio lógico
   - Mensajes descriptivos
   - No mezclar cambios no relacionados

2. **Pull Requests**
   - Descripción clara del cambio
   - Screenshots si aplica
   - Lista de cambios
   - Tests actualizados

3. **Code Review**
   - Revisar código de otros
   - Comentar constructivamente
   - Aprobar solo si cumple estándares

4. **Mantenimiento**
   - Limpiar ramas antiguas
   - Mantener historial limpio
   - Resolver conflictos rápidamente 