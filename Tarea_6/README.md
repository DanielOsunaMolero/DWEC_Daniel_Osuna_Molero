# PerroVerso

**PerroVerso** es un sitio web futurista que muestra imágenes aleatorias de perros usando **The Dog API**, con un diseño moderno basado en **TailwindCSS** y **Parcel**.  

---

## Tecnologías utilizadas
- **TailwindCSS**
- **JavaScript**
- **Parcel**
- **Scroll infinito**

---

## Instalación y configuración

### **Clonar el repositorio**
```bash
git clone https://github.com/DanielOsunaMolero/DWEC_Daniel_Osuna_Molero.git
cd perroverso
```

### **Instalar dependencias**
```bash
npm install
```

### **Ejecutar el entorno de desarrollo**
```bash
npm run dev
```
Esto iniciará el servidor de desarrollo en **`http://localhost:1234`**.

### **Generar la versión optimizada para producción**
```bash
npm run build
```
Parcel generará los archivos optimizados en la carpeta **`dist/`**.

---

## **Estructura del proyecto**
```bash
/perroverso
│── /src
│   ├── /assets
│   │   ├── /styles
│   │   │   ├── input.css
│   │   ├── /images
│   │   ├── /js
│   │   │   ├── api.js
│   │   │   ├── main.js
│   ├── index.html
│── /dist (generado automáticamente)
│── .gitignore
│── package.json
│── tailwind.config.js
│── postcss.config.js
│── README.md
```

---

## **Configuración de TailwindCSS**
Si necesitas modificar los estilos de Tailwind, edita **`tailwind.config.js`**:

```javascript
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
```

Si aparece una advertencia de Parcel sobre `postcss.config.js`, cambia a **`.postcssrc.json`**:

```json
{
  "plugins": {
    "tailwindcss": {}
  }
}
```



