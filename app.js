import React from 'react';
import { NativeRouter } from 'react-router-native'; // Asegúrate de importar NativeRouter
import Main from './components/Main';  // O el archivo donde tienes tus rutas

const App = () => {
  return (
    <NavigationContainer>
      <NativeRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </NativeRouter>
    </NavigationContainer>
    
  );
};

export default App;