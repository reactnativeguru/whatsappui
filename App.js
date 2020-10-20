import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import MainTabs from './src/navigation/mainTabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './src/navigation/root';
import {AuthFirebaseProvider} from './src/context/AuthFirebaseContext';

const App = (props) => (
  <SafeAreaProvider>
    <AuthFirebaseProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </AuthFirebaseProvider>
  </SafeAreaProvider>
);
export default App;
