import React, {useState} from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import BluetoothScreen from './BluetoothScreen'
import HomeOptionsButton from './components/HomeOptionsButton';

import {ActivityIndicator} from 'react-native';

const Stack = createNativeStackNavigator();
const App = () => {
  const navigationRef = useNavigationContainerRef();

  const connect = () => {
    navigationRef.navigate('bluetoothScreen');
  };

  const disconnect = () => {
    console.log('Disconnect clicked');
  };

  const BluetoothConnectionScreen = ({navigation, route}) => {
    return <BluetoothScreen />;
  };

  const Home = ({navigation, route}) => {
    return <HomeScreen />;
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'home'}}
        /> */}
        <Stack.Screen
          name="Setting"
          component={Home}
          options={{
            title: 'Remote',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#333',
            },
            headerRight: () => (
              <HomeOptionsButton
                buttonNames={['connect', 'disconnect', 'cancel']}
                buttonActions={[connect, disconnect]}
              />
            )
          }}
        />
        <Stack.Screen
          name="bluetoothScreen"
          component={BluetoothConnectionScreen}
          options={{
            title: 'Select bluetooth board',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#333',
            },
            headerRight: () => <ActivityIndicator />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
