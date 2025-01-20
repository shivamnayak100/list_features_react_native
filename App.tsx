import { StyleSheet, Text, View } from 'react-native';
import DocumentListScreen from './src/screens/DocumentListScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { CustomTheme } from './src/utils/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import './src/translation/i18next' // importing for language(Localization)
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  // For Dynamic linking 
  const linking = {
    prefixes: ['https://example.com/app'],
    config: {
      screens: {
        Search: 'Home/:parameter',
      },
    },
  };
  return (
    <PaperProvider theme={CustomTheme}>
     <NavigationContainer  linking={linking}>
      <Stack.Navigator  initialRouteName="DocumentList">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="DocumentList"
          options={{headerShown: false}}
          component={DocumentListScreen}
          initialParams={{search: 'test'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
