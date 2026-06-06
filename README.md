# CV — Pedro Luis Bedón Carbajal
CV profesional formato Harvard · React + Vite · PDF real con links clickeables · Word estructurado

---

## ✅ Requisitos previos — instala esto primero

### Node.js
Descarga desde: https://nodejs.org/  
Elige la versión **LTS** (botón verde grande). Instala normalmente.

Verifica que quedó bien abriendo una terminal y escribiendo:
```
node -v
npm -v
```
Deben mostrar un número de versión (ej: v20.11.0).

---

## 🚀 Pasos para correr el proyecto

### 1 — Abre la carpeta en VS Code
File → Open Folder → selecciona la carpeta `cv-pedro`

### 2 — Abre la terminal integrada
Terminal → New Terminal  (o `Ctrl + ñ` en Windows)

### 3 — Instala las dependencias (solo la primera vez)
```
npm install
```
Espera que termine. Instala React, Vite, @react-pdf/renderer, docx, etc.

### 4 — Inicia el proyecto
```
npm run dev
```
Abre tu navegador en: **http://localhost:5173**

---

## 📄 Cómo funcionan las descargas

| Botón | Resultado |
|---|---|
| Descargar PDF | PDF real con páginas A4 (4 páginas), links clickeables, tipografía limpia |
| Descargar Word | Archivo .docx estructurado, editable en Word o Google Docs |

El PDF tiene **4 páginas A4**:
- Página 1 → Header + Resumen + Experiencia Empresoft
- Página 2 → Experiencia APM + Proyectos  
- Página 3 → Conocimientos Técnicos
- Página 4 → Educación + Certificaciones + Idiomas

---

## ✏️ Cómo editar tu información

Todo el contenido está en **`src/cvData.js`**.
Solo edita ese archivo. Los cambios se aplican automáticamente al PDF y al Word.

---

## 📁 Estructura del proyecto

```
cv-pedro/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          ← Punto de entrada
    ├── App.jsx           ← Componente raíz
    ├── CV.jsx            ← Vista web del CV + botones
    ├── CV.css            ← Estilos Harvard
    ├── CVPdf.jsx         ← Documento PDF real (4 páginas A4)
    ├── cvData.js         ← Tus datos (edita aquí)
    ├── downloadUtils.js  ← Lógica de descarga Word
    └── index.css         ← Estilos globales
```

---

## 🌐 Publicar en Vercel (opcional)

1. Sube el proyecto a GitHub
2. Entra a https://vercel.com
3. Conecta tu repositorio
4. Vercel lo despliega automáticamente

Obtienes una URL como: `pedrobedon.vercel.app`
