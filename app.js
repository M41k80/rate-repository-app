import React from "react";
import Main from "./app/index";
import { ApolloProvider } from "@apollo/client";
import client from '../utils/apolloClient';




const App = () => {
  return ( 
    // <ApolloProvider client={client}>
    //    <Main />
    // </ApolloProvider>
    <Main />
     
  
    );
};

export default App;

// import React from 'react';
// import { NativeRouter } from 'react-router-native'; 
// import { createStackNavigator } from '@react-navigation/stack';
// import Main from './app/index';  

// const App = () => {
//   return (
//     <NavigationContainer>
//       <NativeRouter>
//     <Routes>
//       <Route path="/" element={<Main />} />
//       <Route path="/about" element={<About />} />
//     </Routes>
//   </NativeRouter>
//     </NavigationContainer>
    
//   );
// };

// export default App;