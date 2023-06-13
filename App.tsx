import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://12db23e3737640f39f3457fa196f928f@o4505351183073280.ingest.sentry.io/4505351190872064',
  enableInExpoDevelopment: true,
  debug: true,
})

export default function App() {
  return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto"/>
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
