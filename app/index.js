import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppScreen from '../components/AppScreen';
import SignIn from '../components/SignIn';
import theme from './theme';
import RepositoryList from '../components/RepositoryList';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ApolloProvider } from '@apollo/client';
import client  from '../utils/apolloClient';

const Stack = createStackNavigator();




const Main = () => {
  return (
    
    <ApolloProvider client={client}>
      <Stack.Navigator>
        <Stack.Screen 
        name="Home"
        component={AppScreen} 
        options={{title: 'Home',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.textLight,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: theme.fontSizes.large,
        },
        headerLeft: () => <Icon 
        name="home" 
        color="yellow" 
        size={30} 
        style={{ marginLeft: 110 }} />,
        }}
        />
        <Stack.Screen name="Repositories" component={RepositoryList}/>
        <Stack.Screen name="SignIn" component={SignIn} />
        
        
        
      </Stack.Navigator>
    </ApolloProvider>
    
  );
};

export default Main;

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { View, StyleSheet } from 'react-native';
// import RepositoryList from '../components/RepositoryList.js';
// import AppBar  from '../components/AppBar.jsx';
// import theme from './theme.js';


// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: theme.colors.secondary,
//     flexGrow: 1,
//     flexShrink: 1,
//     padding: theme.spacing.medium,
//   },
// });

// const Main = () => {
//   return (
//     <View style={styles.container}>
//       <AppBar />
//       <RepositoryList />
      
//     </View>
//   );
// };

// export default Main;


// {/* <Routes>
        // <Route path="/" element={<RepositoryList />} /> {/* Usa "element" en lugar de renderizar JSX directamente */}
      //   <Route path="*" element={<Navigate to="/" />} />  {/* Asegúrate de usar un redireccionamiento adecuado */}
      // </Routes> */}