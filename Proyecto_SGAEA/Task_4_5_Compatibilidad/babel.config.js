export default {
    presets: [
      [
        '@babel/preset-env', // Incluye el preset de Babel que hace posible la transpilación
        {
          targets: '> 0.25%, not dead',  // Directrices para que funcione en los navegadores deseados
          useBuiltIns: 'usage',        
          corejs: 3                    
        }
      ]
    ]
  };