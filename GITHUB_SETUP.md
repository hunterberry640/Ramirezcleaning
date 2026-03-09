# Pasos para Subir el Código a GitHub

## Pasos Rápidos

### 1. Inicializar Git (si no está inicializado)
```bash
cd c:\RamirezCleaningServices
git init
```

### 2. Agregar todos los archivos
```bash
git add .
```

### 3. Hacer el primer commit
```bash
git commit -m "Initial commit - Ramirez Cleaning Services landing page"
```

### 4. Conectar con tu repositorio de GitHub
Reemplaza `TU-USUARIO` y `NOMBRE-REPO` con los valores reales:
```bash
git remote add origin https://github.com/TU-USUARIO/NOMBRE-REPO.git
```

### 5. Subir el código
```bash
git branch -M main
git push -u origin main
```

---

## Si ya tienes archivos en GitHub

Si el repositorio ya tiene archivos (como README), usa:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## Verificar que todo está bien

Después de hacer push, verifica:
```bash
git status
```

Debería decir "Your branch is up to date with 'origin/main'"

---

## Nota Importante

El archivo `.gitignore` ya está configurado para excluir:
- `node_modules/` (no se sube)
- `dist/` (no se sube - se genera con `npm run build`)
- Archivos temporales y logs

Solo se subirán los archivos fuente necesarios.
