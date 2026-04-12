import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import NotificationBox from './src/components/NotificationBox';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NotificationBox />
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default App;
