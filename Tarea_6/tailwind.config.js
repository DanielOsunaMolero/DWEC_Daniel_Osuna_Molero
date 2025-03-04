module.exports = {
  mode: 'jit', // Habilitar modo JIT para mejor rendimiento
  content: [
    "./index.html", 
    "./src/**/*.html", 
    "./src/assets/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


//npx tailwindcss -i .\src\assets\styles\input.css -o .\src\assets\styles\output.css --watch