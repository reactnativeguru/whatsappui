import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import MainTabs from './src/navigation/mainTabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStack from './src/navigation/root';

const App = (props) => (
  <SafeAreaProvider>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  </SafeAreaProvider>
);
export default App;
