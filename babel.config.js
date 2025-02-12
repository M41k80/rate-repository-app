module.exports = function (api) {
  api.cache(true); // Habilita el caching para mejor rendimiento
  return {
    presets: ['babel-preset-expo'], // Solo usa babel-preset-expo
    plugins: [
      // Configura los plugins para propiedades y métodos privados
      ["@babel/plugin-transform-private-property-in-object", { "loose": true }],
      ["@babel/plugin-transform-private-methods", { "loose": true }],
      ["@babel/plugin-transform-class-properties", { "loose": true }]
    ],
  };
};


// module.exports = {
//     presets: ['babel-preset-expo',
//       '@babel/preset-env', 
//       '@babel/preset-react',
//       '@babel/preset-typescript',
//       'module:metro-react-native-babel-preset'],
//   };