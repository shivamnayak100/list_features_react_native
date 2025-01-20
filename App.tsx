import { StyleSheet, Text, View } from 'react-native';
import DocumentListScreen from './src/screens/DocumentListScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { CustomTheme } from './src/utils/theme';
import './src/translation/i18next'

export default function App() {
  return (
    <PaperProvider theme={CustomTheme}>
    <View style={styles.container}>
      <DocumentListScreen/>
    </View>
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
