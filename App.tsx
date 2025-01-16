import { StyleSheet, Text, View } from 'react-native';
import DocumentListScreen from './src/screens/DocumentListScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <DocumentListScreen/>
    </View>
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
